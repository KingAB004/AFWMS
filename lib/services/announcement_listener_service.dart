import 'dart:async';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

/// Firestore Listener Service - Monitors announcements in real-time
/// Shows local notifications when LGU creates new announcements
class AnnouncementListenerService {
  static final AnnouncementListenerService _instance = AnnouncementListenerService._internal();
  factory AnnouncementListenerService() => _instance;
  AnnouncementListenerService._internal();

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  
  StreamSubscription<QuerySnapshot>? _announcementSubscription;
  String? _lastAnnouncementId;
  bool _isInitialized = false;

  /// Initialize the listener service
  Future<void> initialize() async {
    if (_isInitialized) return;

    // Initialize local notifications
    await _initializeLocalNotifications();

    // Get the latest announcement ID to avoid showing old announcements on app start
    await _getLatestAnnouncementId();

    // Start listening for new announcements
    _startListening();

    _isInitialized = true;
    print('✅ Announcement Listener Service initialized');
  }

  /// Initialize local notifications plugin
  Future<void> _initializeLocalNotifications() async {
    const AndroidInitializationSettings androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const DarwinInitializationSettings iosSettings = DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );

    const InitializationSettings initSettings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );

    await _localNotifications.initialize(
      initSettings,
      onDidReceiveNotificationResponse: _onNotificationTapped,
    );

    // Create notification channels for Android
    await _createNotificationChannels();
  }

  /// Create notification channels for different announcement types
  Future<void> _createNotificationChannels() async {
    // Emergency channel (red, high priority)
    const AndroidNotificationChannel emergencyChannel = AndroidNotificationChannel(
      'emergency_alerts',
      'Emergency Alerts',
      description: 'Critical emergency announcements from LGU',
      importance: Importance.max,
      playSound: true,
      enableVibration: true,
      vibrationPattern: Int64List.fromList([0, 1000, 500, 1000]),
      showBadge: true,
    );

    // Warning channel (orange, high priority)
    const AndroidNotificationChannel warningChannel = AndroidNotificationChannel(
      'warning_alerts',
      'Warning Alerts',
      description: 'Important warnings from LGU',
      importance: Importance.high,
      playSound: true,
      enableVibration: true,
      showBadge: true,
    );

    // Info channel (blue, normal priority)
    const AndroidNotificationChannel infoChannel = AndroidNotificationChannel(
      'info_alerts',
      'Information',
      description: 'General information from LGU',
      importance: Importance.defaultImportance,
      playSound: true,
      showBadge: true,
    );

    final plugin = _localNotifications.resolvePlatformSpecificImplementation<
        AndroidFlutterLocalNotificationsPlugin>();

    await plugin?.createNotificationChannel(emergencyChannel);
    await plugin?.createNotificationChannel(warningChannel);
    await plugin?.createNotificationChannel(infoChannel);
  }

  /// Get the latest announcement ID to prevent showing old notifications
  Future<void> _getLatestAnnouncementId() async {
    try {
      final snapshot = await _firestore
          .collection('announcements')
          .orderBy('timestamp', descending: true)
          .limit(1)
          .get();

      if (snapshot.docs.isNotEmpty) {
        _lastAnnouncementId = snapshot.docs.first.id;
        print('Latest announcement ID: $_lastAnnouncementId');
      }
    } catch (e) {
      print('Error getting latest announcement: $e');
    }
  }

  /// Start listening for new announcements from Firestore
  void _startListening() {
    print('🎧 Started listening for announcements...');

    _announcementSubscription = _firestore
        .collection('announcements')
        .orderBy('timestamp', descending: true)
        .limit(1)
        .snapshots()
        .listen(
          (snapshot) {
            if (snapshot.docs.isEmpty) return;

            final doc = snapshot.docs.first;
            final announcementId = doc.id;

            // Skip if this is the same as the last announcement we've seen
            if (_lastAnnouncementId == null) {
              _lastAnnouncementId = announcementId;
              return; // First load, don't show notification
            }

            if (announcementId == _lastAnnouncementId) {
              return; // Same announcement, skip
            }

            // New announcement detected!
            print('🔔 NEW ANNOUNCEMENT DETECTED!');
            _lastAnnouncementId = announcementId;

            // Get announcement data
            final data = doc.data() as Map<String, dynamic>;
            final String type = data['type'] ?? 'info';
            final String message = data['message'] ?? '';
            final String sender = data['sender'] ?? 'LGU';

            // Show local notification
            _showLocalNotification(type, message, sender, announcementId);
          },
          onError: (error) {
            print('Error listening to announcements: $error');
          },
        );
  }

  /// Show local notification for new announcement
  Future<void> _showLocalNotification(
    String type,
    String message,
    String sender,
    String announcementId,
  ) async {
    print('📱 Showing notification: $type - $message');

    final config = _getNotificationConfig(type);

    final AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      config['channelId'] as String,
      config['channelName'] as String,
      channelDescription: 'LGU announcements and alerts',
      importance: config['importance'] as Importance,
      priority: config['priority'] as Priority,
      color: config['color'] as Color,
      playSound: true,
      enableVibration: true,
      icon: '@mipmap/ic_launcher',
      styleInformation: BigTextStyleInformation(
        message,
        contentTitle: config['title'] as String,
        summaryText: sender,
      ),
    );

    const DarwinNotificationDetails iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
      sound: 'default',
    );

    final NotificationDetails details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );

    await _localNotifications.show(
      announcementId.hashCode, // Unique ID based on announcement
      config['title'] as String,
      message,
      details,
      payload: announcementId,
    );

    print('✅ Notification shown successfully');
  }

  /// Get notification configuration based on type
  Map<String, dynamic> _getNotificationConfig(String type) {
    switch (type) {
      case 'danger':
        return {
          'title': '🚨 EMERGENCY ALERT',
          'channelId': 'emergency_alerts',
          'channelName': 'Emergency Alerts',
          'importance': Importance.max,
          'priority': Priority.max,
          'color': const Color(0xFFEF4444), // Red
        };
      case 'warning':
        return {
          'title': '⚠️ Warning Alert',
          'channelId': 'warning_alerts',
          'channelName': 'Warning Alerts',
          'importance': Importance.high,
          'priority': Priority.high,
          'color': const Color(0xFFF59E0B), // Orange
        };
      case 'info':
      default:
        return {
          'title': 'ℹ️ LGU Announcement',
          'channelId': 'info_alerts',
          'channelName': 'Information',
          'importance': Importance.defaultImportance,
          'priority': Priority.defaultPriority,
          'color': const Color(0xFF3B82F6), // Blue
        };
    }
  }

  /// Handle notification tap
  void _onNotificationTapped(NotificationResponse response) {
    print('Notification tapped: ${response.payload}');
    
    // TODO: Navigate to announcements screen
    // You can use a global navigator key or event bus here
    // Example: navigatorKey.currentState?.pushNamed('/announcements');
  }

  /// Stop listening for announcements
  void dispose() {
    _announcementSubscription?.cancel();
    _isInitialized = false;
    print('❌ Announcement Listener Service disposed');
  }

  /// Manually trigger a test notification (for testing)
  Future<void> testNotification() async {
    await _showLocalNotification(
      'info',
      'This is a test notification to verify the system is working.',
      'System',
      'test_${DateTime.now().millisecondsSinceEpoch}',
    );
  }
}

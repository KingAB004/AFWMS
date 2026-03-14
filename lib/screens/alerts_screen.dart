import 'package:flutter/material.dart';
import '../widgets/alerts_dropdown.dart';
import 'main_home_screen.dart';

class AlertsScreen extends StatefulWidget {
  const AlertsScreen({super.key});

  @override
  State<AlertsScreen> createState() => _AlertsScreenState();
}

class _AlertsScreenState extends State<AlertsScreen> {
  // Modern Color Palette
  static const Color bgLight = Color(0xFFF8FAFC);
  static const Color cardWhite = Colors.white;
  static const Color textPrimary = Color(0xFF0F172A);
  static const Color textSecondary = Color(0xFF64748B);
  
  static const Color brandBlue = Color(0xFF0EA5E9);
  static const Color dangerRed = Color(0xFFEF4444);
  static const Color warningOrange = Color(0xFFF59E0B);
  static const Color successGreen = Color(0xFF10B981);
  static const Color infoBlue = Color(0xFF3B82F6);

  void _showNotificationsDropdown() {
    showDialog(
      context: context,
      barrierColor: Colors.black.withOpacity(0.2),
      builder: (context) => Stack(
        children: [
          Positioned(
            top: 60,
            right: 16,
            child: Material(
              color: Colors.transparent,
              child: const AlertsDropdown(),
            ),
          ),
        ],
      ),
    );
  }

  final List<AlertItem> alerts = [
    AlertItem(
      title: "High Water Level Alert",
      body: "Water level reached 18.2m at Marikina River. Critical threshold exceeded. Automated systems active.",
      priority: AlertPriority.high,
      icon: Icons.warning_rounded,
      location: "Marikina River - Tumana",
      timestamp: DateTime.now(),
    ),
    AlertItem(
      title: "Rising Water Level",
      body: "Water level increasing at 0.3m/hour. Continue monitoring and move valuables to higher ground.",
      priority: AlertPriority.medium,
      icon: Icons.waves_rounded,
      location: "Pasig River - C5 Area",
      timestamp: DateTime.now().subtract(const Duration(minutes: 15)),
    ),
    AlertItem(
      title: "Weather Advisory",
      body: "Heavy rainfall expected in the next 6 hours. Monitor water levels closely for changes.",
      priority: AlertPriority.info,
      icon: Icons.cloud_queue_rounded,
      location: "PAGASA Weather Bureau",
      timestamp: DateTime.now().subtract(const Duration(hours: 1)),
    ),
    AlertItem(
      title: "Water Level Stable",
      body: "Manggahan Floodway levels stable at 6.5m. Normal operations confirmed.",
      priority: AlertPriority.low,
      icon: Icons.verified_rounded,
      location: "Manggahan Floodway",
      timestamp: DateTime.now().subtract(const Duration(hours: 2)),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgLight,
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              const SizedBox(height: 12),
              const Text(
                'Recent notifications and warnings',
                style: TextStyle(
                  fontSize: 15,
                  color: textSecondary,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 24),
              ...alerts.map((alert) => _buildAlertCard(alert)),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      children: [
        Container(
          decoration: BoxDecoration(
            color: cardWhite,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4)),
            ],
          ),
          child: IconButton(
            icon: const Icon(Icons.arrow_back_ios_new_rounded),
            onPressed: () {
              final MainHomeScreenState? mainScreen = context.findAncestorStateOfType<MainHomeScreenState>();
              if (mainScreen != null) {
                mainScreen.navigateToHome();
              }
            },
            color: textPrimary,
            iconSize: 20,
          ),
        ),
        const Expanded(
          child: Text(
            'Alerts',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: textPrimary,
              letterSpacing: -0.5,
            ),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            color: cardWhite,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4)),
            ],
          ),
          child: IconButton(
            icon: const Icon(Icons.notifications_none_rounded),
            onPressed: _showNotificationsDropdown,
            color: textPrimary,
            iconSize: 24,
          ),
        ),
      ],
    );
  }

  Widget _buildAlertCard(AlertItem alert) {
    final colors = _getPriorityTheme(alert.priority);
    
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: cardWhite,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: colors['shadow']!,
            blurRadius: 16,
            offset: const Offset(0, 8),
          ),
        ],
        border: Border.all(color: colors['border']!, width: 1.5),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Left color indicator
              Container(
                width: 6,
                color: colors['primary'],
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: colors['bg'],
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Icon(
                              alert.icon,
                              color: colors['primary'],
                              size: 24,
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Expanded(
                                      child: Text(
                                        alert.title,
                                        style: const TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                          color: textPrimary,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                      decoration: BoxDecoration(
                                        color: colors['bg'],
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Text(
                                        alert.priority.name.toUpperCase(),
                                        style: TextStyle(
                                          fontSize: 10,
                                          fontWeight: FontWeight.bold,
                                          color: colors['primary'],
                                          letterSpacing: 0.5,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  alert.body,
                                  style: const TextStyle(
                                    fontSize: 14,
                                    color: textSecondary,
                                    height: 1.5,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Container(
                        padding: const EdgeInsets.only(top: 16),
                        decoration: BoxDecoration(
                          border: Border(top: BorderSide(color: Colors.grey.withOpacity(0.1))),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.access_time_rounded, size: 14, color: textSecondary),
                            const SizedBox(width: 6),
                            Text(
                              _getTimeAgo(alert.timestamp),
                              style: const TextStyle(fontSize: 12, color: textSecondary, fontWeight: FontWeight.w500),
                            ),
                            const SizedBox(width: 12),
                            Container(width: 4, height: 4, decoration: const BoxDecoration(shape: BoxShape.circle, color: textSecondary)),
                            const SizedBox(width: 12),
                            const Icon(Icons.location_on_outlined, size: 14, color: textSecondary),
                            const SizedBox(width: 4),
                            Expanded(
                              child: Text(
                                alert.location,
                                style: const TextStyle(fontSize: 12, color: textSecondary, fontWeight: FontWeight.w500),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Map<String, Color> _getPriorityTheme(AlertPriority priority) {
    switch (priority) {
      case AlertPriority.high:
        return {
          'primary': dangerRed,
          'bg': dangerRed.withOpacity(0.1),
          'border': dangerRed.withOpacity(0.2),
          'shadow': dangerRed.withOpacity(0.05),
        };
      case AlertPriority.medium:
        return {
          'primary': warningOrange,
          'bg': warningOrange.withOpacity(0.1),
          'border': warningOrange.withOpacity(0.2),
          'shadow': warningOrange.withOpacity(0.05),
        };
      case AlertPriority.info:
        return {
          'primary': infoBlue,
          'bg': infoBlue.withOpacity(0.1),
          'border': infoBlue.withOpacity(0.2),
          'shadow': infoBlue.withOpacity(0.05),
        };
      case AlertPriority.low:
        return {
          'primary': successGreen,
          'bg': successGreen.withOpacity(0.1),
          'border': successGreen.withOpacity(0.2),
          'shadow': successGreen.withOpacity(0.02),
        };
    }
  }

  String _getTimeAgo(DateTime dateTime) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);

    if (difference.inMinutes < 1) {
      return 'Just now';
    } else if (difference.inMinutes < 60) {
      return '${difference.inMinutes}m ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours}h ago';
    } else {
      return '${difference.inDays}d ago';
    }
  }
}

enum AlertPriority { high, medium, info, low }

class AlertItem {
  final String title;
  final String body;
  final AlertPriority priority;
  final IconData icon;
  final String location;
  final DateTime timestamp;

  AlertItem({
    required this.title,
    required this.body,
    required this.priority,
    required this.icon,
    required this.location,
    required this.timestamp,
  });
}

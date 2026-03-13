import 'package:flutter/material.dart';

class AlertsScreen extends StatefulWidget {
  const AlertsScreen({super.key});

  @override
  State<AlertsScreen> createState() => _AlertsScreenState();
}

class _AlertsScreenState extends State<AlertsScreen> {
  // Modern minimal palette aligned with DashboardScreen.
  static const Color bgColor = Color(0xFFF8F9FA);
  static const Color cardColor = Colors.white;
  static const Color textMain = Color(0xFF0F172A);
  static const Color textMuted = Color(0xFF64748B);

  // Alert priority colors.
  static const Color highPriorityBg = Color(0xFFFEF2F2);
  static const Color highPriorityTag = Color(0xFFEF4444);
  static const Color mediumPriorityBg = Color(0xFFFFF7ED);
  static const Color mediumPriorityTag = Color(0xFFF59E0B);
  static const Color infoPriorityBg = Color(0xFFEFF6FF);
  static const Color infoPriorityTag = Color(0xFF3B82F6);
  static const Color lowPriorityBg = Color(0xFFF0FDF4);
  static const Color lowPriorityTag = Color(0xFF22C55E);

  final List<AlertItem> alerts = [
    AlertItem(
      title: 'High Water Level Alert',
      body:
          'Water level reached 18.2m at Marikina River. Critical threshold exceeded. Automated systems active.',
      priority: AlertPriority.high,
      icon: '!',
      location: 'Marikina River - Tumana',
      timestamp: DateTime.now(),
    ),
    AlertItem(
      title: 'Rising Water Level',
      body:
          'Water level increasing at 0.3m/hour. Continue monitoring and move valuables to higher ground.',
      priority: AlertPriority.medium,
      icon: '!',
      location: 'Pasig River - C5 Area',
      timestamp: DateTime.now().subtract(const Duration(minutes: 15)),
    ),
    AlertItem(
      title: 'Weather Advisory',
      body:
          'Heavy rainfall expected in the next 6 hours. Monitor water levels closely for changes.',
      priority: AlertPriority.info,
      icon: 'i',
      location: 'PAGASA Weather Bureau',
      timestamp: DateTime.now().subtract(const Duration(hours: 1)),
    ),
    AlertItem(
      title: 'Water Level Stable',
      body:
          'Manggahan Floodway levels stable at 6.5m. Normal operations confirmed.',
      priority: AlertPriority.low,
      icon: 'v',
      location: 'Manggahan Floodway',
      timestamp: DateTime.now().subtract(const Duration(hours: 2)),
    ),
  ];

<<<<<<< Updated upstream
  // Alert priority colors
  static const Color highPriorityBg = Color(0xFFFEE2E2);
  static const Color highPriorityTag = Color(0xFFEF4444);
  static const Color mediumPriorityBg = Color(0xFFFEF9C3);
  static const Color mediumPriorityTag = Color(0xFFEAB308);
  static const Color infoPriorityBg = Color(0xFFE0F2FE);
  static const Color infoPriorityTag = Color(0xFF3B82F6);
  static const Color lowPriorityBg = Color(0xFFDCFCE7);
  static const Color lowPriorityTag = Color(0xFF22C55E);

  final List<AlertItem> alerts = [
    AlertItem(
      title: "High Water Level Alert",
      body: "Water level reached 18.2m at Marikina River. Critical threshold exceeded. Automated systems active.",
      priority: AlertPriority.high,
      icon: "⚠",
      location: "Marikina River - Tumana",
      timestamp: DateTime.now(),
    ),
    AlertItem(
      title: "Rising Water Level",
      body: "Water level increasing at 0.3m/hour. Continue monitoring and move valuables to higher ground.",
      priority: AlertPriority.medium,
      icon: "⚠",
      location: "Pasig River - C5 Area",
      timestamp: DateTime.now().subtract(const Duration(minutes: 15)),
    ),
    AlertItem(
      title: "Weather Advisory",
      body: "Heavy rainfall expected in the next 6 hours. Monitor water levels closely for changes.",
      priority: AlertPriority.info,
      icon: "ⓘ",
      location: "PAGASA Weather Bureau",
      timestamp: DateTime.now().subtract(const Duration(hours: 1)),
    ),
    AlertItem(
      title: "Water Level Stable",
      body: "Manggahan Floodway levels stable at 6.5m. Normal operations confirmed.",
      priority: AlertPriority.low,
      icon: "✓",
      location: "Manggahan Floodway",
      timestamp: DateTime.now().subtract(const Duration(hours: 2)),
    ),
  ];
=======
  void _showNotificationsDropdown() {
    showDialog(
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.1),
      builder: (context) => Stack(
        children: [
          Positioned(
            top: 70,
            right: 24,
            child: Material(
              color: Colors.transparent,
              child: const AlertsDropdown(),
            ),
          ),
        ],
      ),
    );
  }
>>>>>>> Stashed changes

  @override
  Widget build(BuildContext context) {
    return Scaffold(
<<<<<<< Updated upstream
      backgroundColor: ambientGrey,
      appBar: AppBar(
        title: const Text('Alerts', style: TextStyle(fontWeight: FontWeight.w500, fontSize: 20)),
        backgroundColor: Color(0xFF007EA7),
        elevation: 0,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Recent notifications and warnings',
              style: TextStyle(
                fontSize: 14,
                color: Colors.black54,
=======
      backgroundColor: bgColor,
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              const SizedBox(height: 24),
              _buildSummaryCard(),
              const SizedBox(height: 20),
              ...alerts.map(_buildAlertCard),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      children: [
        _buildHeaderButton(
          icon: Icons.arrow_back_ios_new_rounded,
          onTap: () {
            final MainHomeScreenState? mainScreen = context
                .findAncestorStateOfType<MainHomeScreenState>();
            if (mainScreen != null) {
              mainScreen.navigateToHome();
            }
          },
        ),
        const Expanded(
          child: Text(
            'Alerts',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: textMain,
              letterSpacing: -0.4,
            ),
          ),
        ),
        _buildHeaderButton(
          icon: Icons.notifications_none_rounded,
          onTap: _showNotificationsDropdown,
        ),
      ],
    );
  }

  Widget _buildHeaderButton({
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: cardColor,
          borderRadius: BorderRadius.circular(16),
          boxShadow: _subtleShadow(),
        ),
        child: Icon(icon, color: textMain, size: 20),
      ),
    );
  }

  Widget _buildSummaryCard() {
    final highCount = _countByPriority(AlertPriority.high);
    final mediumCount = _countByPriority(AlertPriority.medium);
    final infoCount = _countByPriority(AlertPriority.info);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(24),
        boxShadow: _subtleShadow(),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Recent notifications and warnings',
            style: TextStyle(
              fontSize: 14,
              color: textMuted,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              _buildSummaryChip(
                '$highCount High',
                highPriorityTag,
                highPriorityBg,
>>>>>>> Stashed changes
              ),
              const SizedBox(width: 8),
              _buildSummaryChip(
                '$mediumCount Medium',
                mediumPriorityTag,
                mediumPriorityBg,
              ),
              const SizedBox(width: 8),
              _buildSummaryChip(
                '$infoCount Info',
                infoPriorityTag,
                infoPriorityBg,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryChip(String text, Color color, Color bg) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: color,
        ),
      ),
    );
  }

  Widget _buildAlertCard(AlertItem alert) {
    final colors = _getPriorityColors(alert.priority);

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(20),
        border: Border(left: BorderSide(color: colors['tag']!, width: 4)),
        boxShadow: _subtleShadow(),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: colors['bg'],
              borderRadius: BorderRadius.circular(14),
            ),
            child: Icon(
              _getPriorityIcon(alert.priority),
              color: colors['tag'],
              size: 24,
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        alert.title,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: textMain,
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: colors['bg'],
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        alert.priority.name.toUpperCase(),
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: colors['tag'],
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  alert.body,
                  style: const TextStyle(
                    fontSize: 13,
                    color: textMuted,
                    height: 1.45,
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    const Icon(
                      Icons.access_time_rounded,
                      size: 14,
                      color: textMuted,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      _getTimeAgo(alert.timestamp),
                      style: const TextStyle(fontSize: 12, color: textMuted),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      width: 3,
                      height: 3,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: textMuted,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        alert.location,
                        style: const TextStyle(fontSize: 12, color: textMuted),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Map<String, Color> _getPriorityColors(AlertPriority priority) {
    switch (priority) {
      case AlertPriority.high:
        return {'bg': highPriorityBg, 'tag': highPriorityTag};
      case AlertPriority.medium:
        return {'bg': mediumPriorityBg, 'tag': mediumPriorityTag};
      case AlertPriority.info:
        return {'bg': infoPriorityBg, 'tag': infoPriorityTag};
      case AlertPriority.low:
        return {'bg': lowPriorityBg, 'tag': lowPriorityTag};
    }
  }

  int _countByPriority(AlertPriority priority) {
    return alerts.where((alert) => alert.priority == priority).length;
  }

  IconData _getPriorityIcon(AlertPriority priority) {
    switch (priority) {
      case AlertPriority.high:
        return Icons.warning_amber_rounded;
      case AlertPriority.medium:
        return Icons.report_problem_outlined;
      case AlertPriority.info:
        return Icons.info_outline_rounded;
      case AlertPriority.low:
        return Icons.check_circle_outline_rounded;
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

  List<BoxShadow> _subtleShadow() {
    return [
      BoxShadow(
        color: Colors.black.withValues(alpha: 0.03),
        blurRadius: 16,
        offset: const Offset(0, 4),
      ),
    ];
  }
}

enum AlertPriority { high, medium, info, low }

class AlertItem {
  final String title;
  final String body;
  final AlertPriority priority;
  final String icon;
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

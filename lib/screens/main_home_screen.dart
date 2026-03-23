import 'package:flutter/material.dart';
import 'dashboard_screen.dart';
import 'weather_screen.dart';
import 'alerts_screen.dart';
import 'settings_screen.dart';

class MainHomeScreen extends StatefulWidget {
  const MainHomeScreen({super.key});

  @override
  MainHomeScreenState createState() => MainHomeScreenState();
}

class MainHomeScreenState extends State<MainHomeScreen> {
  int _selectedIndex = 1; // Default to Home (Center)
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: _selectedIndex);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  static final List<Widget> _widgetOptions = <Widget>[
    const AlertsScreen(),
    const DashboardScreen(),
    const WeatherScreen(),
  ];

  void _onItemTapped(int index) {
    if (_selectedIndex == index) return;
    
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 500),
      curve: Curves.easeOutQuart,
    );
  }

  // Method to navigate to home tab from child screens
  void navigateToHome() {
    _onItemTapped(1);
  }

  @override
  Widget build(BuildContext context) {
    const primaryColor = Color(0xFF007EAA);
    const inactiveColor = Color(0xFF94A3B8);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        physics: const BouncingScrollPhysics(),
        children: _widgetOptions,
      ),
      bottomNavigationBar: Container(
        height: 110,
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(40),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.08),
                blurRadius: 30,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildNavItem(0, Icons.notifications_none_rounded, Icons.notifications_rounded, 'Alerts', primaryColor, inactiveColor),
              _buildNavItem(1, Icons.home_outlined, Icons.home_rounded, 'Home', primaryColor, inactiveColor),
              _buildNavItem(2, Icons.cloud_outlined, Icons.cloud_rounded, 'Weather', primaryColor, inactiveColor),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, IconData activeIcon, String label, Color primaryColor, Color inactiveColor) {
    final bool isSelected = _selectedIndex == index;
    return GestureDetector(
      onTap: () => _onItemTapped(index),
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        width: 80,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isSelected ? primaryColor : Colors.transparent,
                shape: BoxShape.circle,
                boxShadow: isSelected ? [
                  BoxShadow(
                    color: primaryColor.withOpacity(0.3),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  )
                ] : [],
              ),
              child: Icon(
                isSelected ? activeIcon : icon,
                color: isSelected ? Colors.white : inactiveColor,
                size: 24,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                color: isSelected ? primaryColor : inactiveColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

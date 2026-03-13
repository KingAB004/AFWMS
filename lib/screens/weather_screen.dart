import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../widgets/alerts_dropdown.dart';

class WeatherScreen extends StatefulWidget {
  const WeatherScreen({super.key});

  @override
  State<WeatherScreen> createState() => _WeatherScreenState();
}

class _WeatherScreenState extends State<WeatherScreen> {
  // Modern minimal palette aligned with DashboardScreen.
  static const Color bgColor = Color(0xFFF8F9FA);
  static const Color cardColor = Colors.white;
  static const Color primaryBlue = Color(0xFF2563EB);
  static const Color textMain = Color(0xFF0F172A);
  static const Color textMuted = Color(0xFF64748B);
  static const Color accentLightBlue = Color(0xFFDBEAFE);

<<<<<<< Updated upstream
=======
  final WeatherService _weatherService = WeatherService();
  WeatherForecast? _weatherForecast;
  bool _isLoading = true;
  String? _error;
  final String _cityName = 'Philippines';

  @override
  void initState() {
    super.initState();
    _fetchWeatherData();
  }

  Future<void> _fetchWeatherData() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final weatherForecast = await _weatherService.getCompleteWeather(
        _cityName,
      );
      setState(() {
        _weatherForecast = weatherForecast;
        _isLoading = false;
      });
    } catch (e) {
      debugPrint('Weather API Error: $e');
      setState(() {
        _error = WeatherUtils.getErrorMessage(e.toString());
        _isLoading = false;
      });
    }
  }

  Future<void> _refreshWeather() async {
    await _fetchWeatherData();
  }

>>>>>>> Stashed changes
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      body: SafeArea(
<<<<<<< Updated upstream
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back_ios),
                    onPressed: () => Navigator.pop(context),
                    color: cerulean,
                    iconSize: 24,
                  ),
                  const Expanded(
                    child: Text(
                      'Weather Forecast',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.w600,
                        color: cerulean,
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.notifications_outlined),
                    onPressed: _showNotificationsDropdown,
                    color: cerulean,
                    iconSize: 28,
                  ),
                ],
              ),
              const SizedBox(height: 20),
              _buildCurrentWeather(),
              const SizedBox(height: 24),
              const Text(
                '5-Day Forecast',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: deepSpaceBlue,
                ),
              ),
              const SizedBox(height: 12),
              _buildForecastList(),
            ],
          ),
        ),
=======
        child: RefreshIndicator(
          onRefresh: _refreshWeather,
          color: primaryBlue,
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(
              parent: BouncingScrollPhysics(),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeader(),
                const SizedBox(height: 28),
                if (_isLoading)
                  _buildLoadingCard()
                else if (_error != null)
                  _buildErrorCard()
                else if (_weatherForecast != null) ...[
                  _buildCurrentWeatherCard(),
                  const SizedBox(height: 24),
                  const Text(
                    '5-Day Forecast',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: textMain,
                    ),
                  ),
                  const SizedBox(height: 12),
                  _buildForecastList(),
                ],
              ],
            ),
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
            'Weather Forecast',
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
>>>>>>> Stashed changes
      ),
    );
  }

<<<<<<< Updated upstream
  Widget _buildCurrentWeather() {
=======
  Widget _buildLoadingCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(28),
        boxShadow: _subtleShadow(),
      ),
      child: const Column(
        children: [
          CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(primaryBlue),
          ),
          SizedBox(height: 16),
          Text(
            'Loading weather data...',
            style: TextStyle(fontSize: 15, color: textMuted),
          ),
        ],
      ),
    );
  }

  Widget _buildErrorCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: const Color(0xFFFECACA)),
        boxShadow: _subtleShadow(),
      ),
      child: Column(
        children: [
          Container(
            width: 52,
            height: 52,
            decoration: const BoxDecoration(
              color: Color(0xFFFEF2F2),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.error_outline_rounded,
              color: Color(0xFFEF4444),
              size: 28,
            ),
          ),
          const SizedBox(height: 14),
          Text(
            _error ?? 'An error occurred',
            style: const TextStyle(fontSize: 15, color: textMain, height: 1.4),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 18),
          ElevatedButton(
            onPressed: _fetchWeatherData,
            style: ElevatedButton.styleFrom(
              backgroundColor: primaryBlue,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              elevation: 0,
            ),
            child: const Text(
              'Retry',
              style: TextStyle(fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCurrentWeatherCard() {
    if (_weatherForecast == null) return const SizedBox();

    final current = _weatherForecast!.currentWeather;
    final icon = WeatherUtils.getWeatherIcon(current.icon, current.main);
    final temperature = WeatherUtils.formatTemperature(current.temperature);
    final description = WeatherUtils.capitalizeDescription(current.description);
    final windSpeed = WeatherUtils.formatWindSpeed(current.windSpeed);
    final humidity = WeatherUtils.formatHumidity(current.humidity);
    final rainfall = WeatherUtils.getRainfallInfo(
      current.description,
      current.main,
    );

>>>>>>> Stashed changes
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(28),
        boxShadow: _subtleShadow(),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
<<<<<<< Updated upstream
          const Text(
            'Current Weather',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: Colors.white70,
            ),
=======
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Current Weather',
                    style: TextStyle(
                      fontSize: 15,
                      color: textMuted,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '${current.cityName}, ${current.country}',
                    style: const TextStyle(
                      fontSize: 14,
                      color: textMain,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: _getConditionColor(
                    current.main,
                  ).withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Text(
                  current.main,
                  style: TextStyle(
                    color: _getConditionColor(current.main),
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
>>>>>>> Stashed changes
          ),
          const SizedBox(height: 22),
          Row(
            children: [
<<<<<<< Updated upstream
              const Icon(
                Icons.cloud_outlined,
                size: 60,
                color: Colors.white,
=======
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: accentLightBlue,
                  borderRadius: BorderRadius.circular(18),
                ),
                child: Icon(icon, size: 34, color: primaryBlue),
>>>>>>> Stashed changes
              ),
              const SizedBox(width: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
<<<<<<< Updated upstream
                    '24°C',
                    style: TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.w300,
                      color: Colors.white,
=======
                    temperature,
                    style: const TextStyle(
                      fontSize: 42,
                      fontWeight: FontWeight.w700,
                      color: textMain,
                      letterSpacing: -1,
>>>>>>> Stashed changes
                      height: 1,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
<<<<<<< Updated upstream
                    'Moderate Rain',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white70,
=======
                    description,
                    style: const TextStyle(
                      fontSize: 14,
                      color: textMuted,
                      fontWeight: FontWeight.w500,
>>>>>>> Stashed changes
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 18),
          Text(
            'Updated ${DateFormat('MMM d, h:mm a').format(current.dateTime)}',
            style: const TextStyle(
              fontSize: 12,
              color: textMuted,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 20),
<<<<<<< Updated upstream
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildWeatherStat('Rainfall', '12 mm/hr'),
              Container(
                width: 1,
                height: 30,
                color: Colors.white24,
              ),
              _buildWeatherStat('Humidity', '85%'),
              Container(
                width: 1,
                height: 30,
                color: Colors.white24,
              ),
              _buildWeatherStat('Wind', '12 km/h'),
            ],
=======
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildMetric(label: 'Rainfall', value: rainfall),
                _buildMetric(label: 'Humidity', value: humidity),
                _buildMetric(label: 'Wind', value: windSpeed),
              ],
            ),
>>>>>>> Stashed changes
          ),
        ],
      ),
    );
  }

  Widget _buildMetric({required String label, required String value}) {
    return Column(
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 12,
            color: textMuted,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            fontSize: 13,
            color: textMain,
            fontWeight: FontWeight.w700,
          ),
        ),
      ],
    );
  }

  Widget _buildForecastList() {
<<<<<<< Updated upstream
    final forecasts = [
      {
        'day': 'Today',
        'temp': '24°C',
        'condition': 'Moderate Rain',
        'rainfall': '12 mm/hr',
        'icon': Icons.cloud_outlined,
      },
      {
        'day': 'Tomorrow',
        'temp': '22°C',
        'condition': 'Heavy Rain',
        'rainfall': '18 mm/hr',
        'icon': Icons.cloud_outlined,
      },
      {
        'day': 'Friday',
        'temp': '26°C',
        'condition': 'Light Rain',
        'rainfall': '5 mm/hr',
        'icon': Icons.cloud_outlined,
      },
      {
        'day': 'Saturday',
        'temp': '28°C',
        'condition': 'Partly Cloudy',
        'rainfall': '2 mm/hr',
        'icon': Icons.cloud_queue_outlined,
      },
      {
        'day': 'Sunday',
        'temp': '27°C',
        'condition': 'Light Rain',
        'rainfall': '8 mm/hr',
        'icon': Icons.cloud_outlined,
      },
    ];

    return Column(
      children: forecasts.map((forecast) {
=======
    if (_weatherForecast == null) return const SizedBox();

    return ListView.separated(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      itemCount: _weatherForecast!.forecast.length,
      separatorBuilder: (context, index) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final forecast = _weatherForecast!.forecast[index];
        final day = WeatherUtils.formatForecastDate(forecast.dateTime);
        final temp = WeatherUtils.formatTemperature(forecast.temperature);
        final description = WeatherUtils.capitalizeDescription(
          forecast.description,
        );
        final rainfall = WeatherUtils.getRainfallInfo(
          forecast.description,
          forecast.main,
        );
        final icon = WeatherUtils.getWeatherIcon(forecast.icon, forecast.main);

>>>>>>> Stashed changes
        return Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: cardColor,
            borderRadius: BorderRadius.circular(18),
            boxShadow: _subtleShadow(),
          ),
          child: Row(
            children: [
<<<<<<< Updated upstream
              Icon(
                forecast['icon'] as IconData,
                size: 40,
                color: cerulean,
=======
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: accentLightBlue,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(icon, size: 24, color: primaryBlue),
>>>>>>> Stashed changes
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      forecast['day'] as String,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: textMain,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
<<<<<<< Updated upstream
                      forecast['condition'] as String,
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.grey.shade600,
                      ),
=======
                      description,
                      style: const TextStyle(fontSize: 12, color: textMuted),
>>>>>>> Stashed changes
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    forecast['temp'] as String,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w700,
                      color: textMain,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
<<<<<<< Updated upstream
                    forecast['rainfall'] as String,
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey.shade600,
                    ),
=======
                    rainfall,
                    style: const TextStyle(fontSize: 12, color: textMuted),
>>>>>>> Stashed changes
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Color _getConditionColor(String condition) {
    final value = condition.toLowerCase();
    if (value.contains('rain') || value.contains('storm')) {
      return const Color(0xFFEF4444);
    }
    if (value.contains('cloud')) {
      return const Color(0xFFF59E0B);
    }
    return primaryBlue;
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

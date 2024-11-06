import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Icon, Spinner, useToast, Card } from "@chakra-ui/react";
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from "react-icons/wi";

const WeatherCard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useToast();
    const city = "Kopargaon, Maharashtra";

    const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`

                );
                if (!response.ok) throw new Error("Failed to fetch weather data");
                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
                toast({
                    title: "Error",
                    description: "Failed to fetch weather data. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city, toast]);

    const getWeatherIcon = (weatherCondition) => {
        switch (weatherCondition) {
            case "Clear":
                return <WiDaySunny size={40} />;
            case "Rain":
                return <WiRain size={40} />;
            case "Clouds":
                return <WiCloudy size={40} />;
            case "Snow":
                return <WiSnow size={40} />;
            default:
                return <WiDaySunny size={40} />;
        }
    };

    return (
        <Card
            borderRadius="lg"
            shadow="lg"
            p="4"
            maxWidth="300px" // Reduced width
            maxHeight="100%" // Set height to 50% of viewport height
            w="full"
            bg="linear-gradient(135deg, #81c4f7, #c2e7ff)" // Light blue gradient
            color="black" // Changed text color to black
            _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
            transition="transform 0.3s ease-in-out"
        >
            <Flex direction="column" align="center" justify="center" h="full">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    {city}
                </Text>

                {loading ? (
                    <Flex justify="center" align="center" mt="4">
                        <Spinner size="lg" />
                    </Flex>
                ) : error ? (
                    <Text color="red.500" mt="4">{error}</Text>
                ) : weatherData ? (
                    <>
                        <Flex align="center" justify="center" mt="4">
                            {getWeatherIcon(weatherData.weather[0].main)}
                            <Text fontSize="3xl" fontWeight="bold" ml="4">
                                {weatherData.main.temp}°C
                            </Text>
                        </Flex>
                        <Text fontSize="md" color="gray.700" mt="2" fontWeight="medium">
                            {weatherData.weather[0].description}
                        </Text>
                        <Flex justify="space-between" mt="4" w="full" color="gray.700">
                            <Text fontSize="sm">Humidity: {weatherData.main.humidity}%</Text>
                            <Text fontSize="sm">Wind: {weatherData.wind.speed} m/s</Text>
                        </Flex>
                    </>
                ) : null}
            </Flex>
        </Card>
    );
};

export default WeatherCard;
import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
import { RiArrowUpSFill } from "react-icons/ri";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ElectricityPrices(props) {
    const { ...rest } = props;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

    // State for past actual and predicted prices
    const [actualPrices, setActualPrices] = useState([5.5, 6.2, 5.8, 6.3, 5.9]);
    const [predictedPrices, setPredictedPrices] = useState([6.1, 6.5, 6.3, 6.8, 6.6]);

    // Generate labels based on system time for past, current, and future hours
    const generateHourlyLabels = () => {
        const labels = [];
        const now = new Date();
        // Add previous hours for actual prices
        for (let i = -actualPrices.length + 1; i <= predictedPrices.length; i++) {
            const time = new Date(now.getTime() + i * 60 * 60 * 1000);
            labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
        return labels;
    };

    // Chart options with a plugin for blinking effect
    const chartOptions = {
        responsive: true,
        animation: {
            duration: 1000,
            easing: 'linear',
        },
        elements: {
            line: { tension: 0.3 },
        },
        plugins: {
            tooltip: { enabled: true },
            legend: { display: true },
            blinkingPlugin: {
                id: "blinkingPlugin",
                afterDraw: (chart) => {
                    const { ctx, data } = chart;
                    const lastActualPoint = data.datasets[0].data.length - 1;
                    const lastPredictedPoint = data.datasets[1].data.length - 1;

                    // Start time for continuous animation
                    const startTime = Date.now();

                    // Function for continuous blinking
                    const animateBlinking = () => {
                        const opacity = Math.abs(Math.sin((Date.now() - startTime) / 500)) * 0.7 + 0.3; // Control blinking speed (500ms)

                        // Draw the blinking circle for the last actual price point
                        const actualMeta = chart.getDatasetMeta(0).data[lastActualPoint];
                        ctx.globalAlpha = opacity;
                        ctx.beginPath();
                        ctx.arc(actualMeta.x, actualMeta.y, 6, 0, 2 * Math.PI); // Adjust circle size
                        ctx.fillStyle = `rgba(30, 144, 255, ${ opacity })`; // Blue color for the actual price
                        ctx.fill();

                        // Draw the blinking circle for the last predicted price point
                        const predictedMeta = chart.getDatasetMeta(1).data[lastPredictedPoint];
                        ctx.globalAlpha = opacity;
                        ctx.beginPath();
                        ctx.arc(predictedMeta.x, predictedMeta.y, 6, 0, 2 * Math.PI); // Adjust circle size
                        ctx.fillStyle = `rgba(255, 165, 0, ${ opacity })`; // Orange color for the predicted price
                        ctx.fill();

                        // Continue the animation
                        requestAnimationFrame(animateBlinking);
                    };

                    // Start the continuous animation
                    animateBlinking();
                },
            },
        },
        scales: {
            x: { type: 'category', display: true },
            y: {
                display: true,
                min: 0,
                max: 10,
            },
        }
    };

    // Register the custom plugin for blinking effect
    ChartJS.register({
        id: "blinkingPlugin",
        beforeDraw: chartOptions.plugins.blinkingPlugin.beforeDraw,
    });

    const chartData = {
        labels: generateHourlyLabels(),
        datasets: [
            {
                label: "Actual Price (₹/kWh)",
                data: [...actualPrices, null, null],  // Add null values for future points
                borderColor: "#3182ce",
                backgroundColor: "rgba(49, 130, 206, 0.1)",
                fill: true,
                borderWidth: 2,
            },
            {
                label: "Predicted Price (₹/kWh)",
                data: [null, null, ...predictedPrices],  // Add null values for past points
                borderColor: "#FF6347",
                backgroundColor: "rgba(255, 99, 71, 0.1)",
                fill: true,
                borderDash: [5, 5],
                borderWidth: 2,
            },
        ],
    };

    // Update prediction periodically
    useEffect(() => {
        const interval = setInterval(() => {
            // Update predicted values for simulation purposes
            setPredictedPrices((prevData) => [
                ...prevData.slice(1),
                Math.min(10, Math.max(0, prevData[prevData.length - 1] + (Math.random() * 2 - 1) * 0.5)),
            ]);
            // Update actual values to simulate real-time tracking
            setActualPrices((prevData) => [
                ...prevData.slice(1),
                Math.min(10, Math.max(0, prevData[prevData.length - 1] + (Math.random() * 2 - 1) * 0.5)),
            ]);
        }, 3600000); // Update every hour, or adjust for faster testing

        return () => clearInterval(interval);
    }, []);

    return (
        <Card
            justifyContent='center'
            align='center'
            direction='column'
            w='100%'
            mb='0px'
            {...rest}>
            <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
                <Flex align='center' w='100%'>
                    <Button
                        bg={useColorModeValue("secondaryGray.300", "whiteAlpha.100")}
                        fontSize='sm'
                        fontWeight='500'
                        color={textColorSecondary}
                        borderRadius='7px'>
                        <Icon
                            as={MdOutlineCalendarToday}
                            color={textColorSecondary}
                            me='4px'
                        />
                        Hourly Prediction
                    </Button>
                    <Button
                        ms='auto'
                        align='center'
                        justifyContent='center'
                        bg={useColorModeValue("secondaryGray.300", "whiteAlpha.100")}
                        _hover={{ bg: "secondaryGray.400" }}
                        w='37px'
                        h='37px'
                        borderRadius='10px'
                        {...rest}>
                        <Icon as={MdBarChart} color={useColorModeValue("brand.500", "white")} w='24px' h='24px' />
                    </Button>
                </Flex>
            </Flex>
            <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
                <Flex flexDirection='column' me='20px' mt='28px'>
                    <Text
                        color={textColor}
                        fontSize='34px'
                        fontWeight='700'
                        lineHeight='100%'>
                        ₹{predictedPrices[predictedPrices.length - 1].toFixed(2)}
                    </Text>
                    <Flex align='center' mb='20px'>
                        <Text color='secondaryGray.600' fontSize='sm' fontWeight='500' mt='4px' me='12px'>
                            Electricity Price (Predicted)
                        </Text>
                        <Flex align='center'>
                            <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' />
                            <Text color='green.500' fontSize='sm' fontWeight='700'>
                                Prediction
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Box minH='260px' minW='75%' mt='auto'>
                    <Line data={chartData} options={chartOptions} />
                </Box>
            </Flex>
        </Card>
    );
}
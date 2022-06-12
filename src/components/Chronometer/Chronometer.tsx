import React, { useCallback, useEffect } from 'react'

export interface IChronometerProps {
    title: string;
    image: string;
    time: string;
    mp3: string;
}

const Chronometer = ({ title, image, time, mp3 }: IChronometerProps) => {
    let hours: number = 0, minutes: number = 0, seconds: number = 0;
    const init = () => {
        [hours, minutes, seconds] = time.split(':').map((time: string) => parseInt(time));
    }
    init();
    const [currentSeconds, setCurrentSeconds] = React.useState(seconds!);
    const [currentMinutes, setCurrentMinutes] = React.useState(minutes!);
    const [currentHours, setCurrentHours] = React.useState(hours!);
    const [isRunning, setIsRunning] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const [isStopped, setIsStopped] = React.useState(false);
    const [isFinished, setIsFinished] = React.useState(false);
    const [isReset, setIsReset] = React.useState(false);
    const [isStarted, setIsStarted] = React.useState(false);
    let interval: any;
    const handleStart = () => {
        console.log('Start')
        setIsRunning(true);
        setIsPaused(false);
        setIsStopped(false);
        setIsFinished(false);
        setIsReset(false);
        setIsStarted(true);
    }

    const audio = new Audio(mp3);

    const playAlarm = () => {
        console.log('Alarm')
        audio.play();
    }

    const tick = useCallback(() => {
        console.log('Interval', currentSeconds, currentMinutes, currentHours)

        if (currentSeconds === 0 && currentMinutes === 0 && currentHours === 0) {
            setIsRunning(false);
            setIsPaused(false);
            setIsStopped(false);
            setIsFinished(true);
            setIsReset(false);
            setIsStarted(false);
            clearInterval(interval);
            playAlarm();
            init();
            setCurrentHours(hours);
            setCurrentMinutes(minutes);
            setCurrentSeconds(seconds);
        }

        if (currentSeconds === 0) {
            if (currentMinutes === 0) {
                if (currentHours === 0) {
                    clearInterval(interval);
                    return;
                }
                setCurrentHours(currentHours - 1);
                setCurrentMinutes(59);
                setCurrentSeconds(59);
            } else {
                setCurrentMinutes(currentMinutes - 1);
                setCurrentSeconds(59);
            }
        } else {
            setCurrentSeconds(currentSeconds - 1);
        }
    }, [currentSeconds, currentMinutes, currentHours, hours, minutes, seconds]);

    const handleStop = () => {
        console.log('Stop')
        setIsRunning(false);
        setIsPaused(false);
        setIsStopped(true);
        setIsFinished(false);
        setIsReset(false);
        setIsStarted(false);
        clearInterval(interval);
    }
    const handleReset = () => {
        console.log('Reset')
        setIsRunning(false);
        setIsPaused(false);
        setIsStopped(false);
        setIsFinished(false);
        setIsReset(true);
        setIsStarted(false);
        clearInterval(interval);
        setCurrentSeconds(seconds);
        setCurrentMinutes(minutes);
        setCurrentHours(hours);
    }

    const handlePause = () => {
        console.log('Pause')
        setIsRunning(false);
        setIsPaused(true);
        setIsStopped(false);
        setIsFinished(false);
        setIsReset(false);
        setIsStarted(false);
        clearInterval(interval);
    }

    console.log('Render');

    useEffect(() => {
        console.log('Effect');
        if (isRunning) {
            interval = setInterval(() => {
                tick()
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        }
    }, [isStarted, currentHours, currentMinutes, currentSeconds, isRunning]);
    return (
        <div>
            <h4>{title}</h4>
            <img src={image} alt="chronometer" />
            <p>{`${currentHours}:${currentMinutes}:${currentSeconds}`}</p>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handlePause}>Pause</button>
        </div>
    )
}

export default Chronometer

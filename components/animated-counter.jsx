"use client";

import React, { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "framer-motion";

const AnimatedCounter = ({ value }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Parse the value to find prefix, number, and suffix
    // Regex matches: 
    // 1. Prefix: Any non-digit, non-dot characters at start
    // 2. Number: Digits and optional dots
    // 3. Suffix: Any remaining characters
    const match = String(value).match(/^([^0-9.]*)([0-9.]+)(.*)$/);

    if (!match) {
        return <span>{value}</span>;
    }

    const prefix = match[1];
    const numberStr = match[2];
    const suffix = match[3];

    const number = parseFloat(numberStr);
    const decimals = numberStr.includes(".") ? numberStr.split(".")[1].length : 0;

    return (
        <span ref={ref}>
            {isInView ? (
                <CountUp
                    start={0}
                    end={number}
                    duration={2.5}
                    prefix={prefix}
                    suffix={suffix}
                    separator=","
                    decimal="."
                    decimals={decimals}
                    formattingFn={(value) => {
                        return new Intl.NumberFormat("en-IN", {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals,
                        }).format(value);
                    }}
                />
            ) : (
                <span>{prefix}0{suffix}</span>
            )}
        </span>
    );
};

export default AnimatedCounter;

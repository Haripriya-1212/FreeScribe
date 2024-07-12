// src/components/TestProxy.js
import React, { useEffect, useState } from 'react';

function TestProxy() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/openai/whisper-tiny.en')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching model:', error));
    }, []);

    return (
        <div>
            <h1>Test Proxy</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default TestProxy;

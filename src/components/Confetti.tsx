import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'confetti-react';

const ConfettiComponent: React.FC = () => {
    const { width, height } = useWindowSize();
    return <Confetti width={width} height={height} />;
};

ConfettiComponent.displayName = 'ConfettiComponent';

export default ConfettiComponent;

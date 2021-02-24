import * as React from 'react';
import { ReactComponent as Logo } from '@/icon/svg/Logo.svg';

type IconProps = React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}

const Icon: React.FC<IconProps> = props => {
    console.log(Logo); // undefined
    return (<Logo />);
};

export default Icon;
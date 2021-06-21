import React, { Component } from 'react';
import { RouteConfig } from "react-router-config";
import { RouteModel } from '@/router/route.config'

export interface IRouteConfig extends RouteConfig {
    route: RouteModel
}

interface componentState {
    component: null | React.ElementType // ElementType 的泛型P代表props
}

const AsyncComponent = (importComponent: Function) => {
    return class extends Component<IRouteConfig, componentState> {
        private _isMounted: any;
        constructor(props: IRouteConfig) {
            super(props);
            this.state = {
                component: null
            }
        }
        componentDidMount() {
            this._isMounted = true
            importComponent()
                .then((cmp: { default: any; }) => {
                    if (this._isMounted) {
                        this.setState({ component: cmp.default });
                    }
                });
        }
        componentWillUnMount = () => {
            this._isMounted = false
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : <></>;
        }
    }
};

export default AsyncComponent;
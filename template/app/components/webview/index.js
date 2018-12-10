import React, { Component } from 'react';
import { WebView as RNWebView } from 'react-native';

const injectJsStr = `
    window.RnWebViewBridge = {
        postMessage: function(params, callback) {
            var options = {
                __webview_flag: '__webview_flag',
                params: params
            };

            if (typeof callback === 'function') {
                options.__callback = '_callback_' + Date.now();
                window[options.__callback] = callback;
            }

            postMessage(JSON.stringify(options), '*');
        },
        addListener: function(eventName) {
            postMessage(JSON.stringify({
                __webview_flag: '__webview_flag',
            }), '*');
        }
    }
`;

export default class WebView extends Component {
    static defaultProps = {
        onMessageBridge: () => {}
    }

    onMessage = e => {
        try {
            const { params, __callback, __webview_flag } = JSON.parse(e.nativeEvent.data);

            if (__webview_flag === '__webview_flag') {
                if(__callback) {
                    this.props.onMessageBridge(params, data => {
                        this.webRef.injectJavaScript(`
                            ${__callback}(${JSON.stringify(data)});
                            delete window.${__callback};
                        `);
                    });
                    return;
                }
                this.props.onMessageBridge(params, () => { });
            }
        } catch(err) {
            this.props.onMessageBridge(e, () => {});
        }

        this.props.onMessageBridge(e, () => {});
    }

    render() {
        return (
            <RNWebView
                {...this.props}
                ref={ref => this.webRef = ref}
                injectedJavaScript={injectJsStr}
                onMessage={this.onMessage}
            />
        );
    }
}
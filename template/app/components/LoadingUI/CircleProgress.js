import React from 'react';

import { ActivityIndicator, StyleSheet } from 'react-native';

class CircleProgress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ActivityIndicator
        animating={true}
        color='white'
        style={styles.centering}
        size='small'
      />
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40
  }

});

export default CircleProgress;

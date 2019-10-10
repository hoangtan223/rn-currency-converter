import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCurrencyValue: 0,
      convertedCurrencyValue: 0,
      fromCurrency: 'vnd',
      toCurrency: 'usd'
    }
  }

  setConversionCurrencies = (from, to) => {
    this.setState({
      fromCurrency: from,
      toCurrency: to
      }, () => {
        this.onCurrencyChange(this.state.currentCurrencyValue)
      })
  };

  onCurrencyChange = (currency) => {
    let value;
    if (this.state.fromCurrency === 'vnd') {
      value = currency / 23000;
    } else {
      value = 23000 * currency;
    }
    this.setState({
      currentCurrencyValue: currency,
      convertedCurrencyValue: value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Please enter the value of the currency you want to convert</Text>
        <TextInput
          onChangeText={ (currency) => this.onCurrencyChange(currency) }
          keyboardType="number-pad"
          autoFocus={true}
          textAlign="center"
          placeholder="100,000,000 VND"
          selectionColor="red"
          style={{
            height: 60,
            padding: 5,
            width: 300,
            fontSize: 35,
            borderWidth: 1,
            borderColor: 'lightblue'
          }}
        />
        <ConversionTypeButton
          from={'usd'}
          to={'vnd'}
          toCurrency={this.state.toCurrency}
          fromCurrency={this.state.fromCurrency}
          setConversionCurrencies={this.setConversionCurrencies}
        />
        <ConversionTypeButton
          from={'vnd'}
          to={'usd'}
          toCurrency={this.state.toCurrency}
          fromCurrency={this.state.fromCurrency}
          setConversionCurrencies={this.setConversionCurrencies}
        />
        <FormattedCurrency type={this.state.fromCurrency} value={this.state.currentCurrencyValue} />
        <FormattedCurrency type={this.state.toCurrency} value={this.state.convertedCurrencyValue} />
      </View>
    );
  }
}

const ConversionTypeButton = ({
  to,
  from,
  toCurrency,
  fromCurrency,
  setConversionCurrencies
}) => {
  const isSelectedConversionType = fromCurrency === from && toCurrency === to;
  const backgroundColor = isSelectedConversionType ? 'lightblue' : null;
  const conditionalButtonStyle = { backgroundColor };

  const fromFlag = from === 'usd' ? '🇺🇸' : '🇻🇳';
  const toFlag = to === 'usd' ? '🇺🇸' : '🇻🇳';

  return (
    <TouchableOpacity
      style={[styles.button, conditionalButtonStyle]}
      onPress={() => setConversionCurrencies(from, to)}
    >
      <Text style={styles.buttonText}>
        {fromFlag} to {toFlag}
      </Text>
    </TouchableOpacity>
  );
};

const FormattedCurrency = props => {
  const format = props.type === 'usd' ? 'us' : 'vn';
  const currency = props.type === 'usd' ? 'USD' : 'VND';
  const flag = props.type === 'usd' ? '🇺🇸' : '🇻🇳';

  const formatter = new Intl.NumberFormat(format, {
    currency,
    style: 'currency'
  });

  return (
    <Text style={styles.currencyText}>
      {formatter.format(props.value)} {flag}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: 'lightblue',
    justifyContent: 'center'
  },
  currencyText: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold'
  }
});

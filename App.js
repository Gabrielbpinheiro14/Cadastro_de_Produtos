import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function App() {
  const [codProduto, setCodProduto] = useState('');
  const [descProduto, setDescProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [quantProduto, setQuantProduto] = useState('');
  const [lista, setLista] = useState([]);

  const addProduto = () => {
    if (
      codProduto === '' ||
      descProduto === '' ||
      precoProduto === '' ||
      quantProduto === ''
    ) {
      alert('Todos os dados devem ser preenchidos!');
      return;
    }

    const existingProduct = lista.find((produto) => produto.codigo === codProduto);
    if (existingProduct) {
      alert('Produto com código já existente!');
      return;
    }

    setLista((lista) => [
      ...lista,
      {
        codigo: codProduto,
        descricao: descProduto,
        preco: precoProduto,
        quantidade: quantProduto,
      },
    ]);

    limparInput();
  };

  const alteraProduto = () => {
    if (
      codProduto === '' ||
      descProduto === '' ||
      precoProduto === '' ||
      quantProduto === ''
    ) {
      alert('Todos os dados devem ser preenchidos!');
      return;
    }

    const updatedLista = lista.map((produto) =>
      produto.codigo === codProduto
        ? {
            ...produto,
            descricao: descProduto,
            preco: precoProduto,
            quantidade: quantProduto,
          }
        : produto
    );

    setLista(updatedLista);
    limparInput();
  };

  const apagarProduto = () => {
    if (codProduto === '') {
      alert('Digite o código do produto a ser apagado!');
      return;
    }

    const produtoIndex = lista.findIndex((item) => item.codigo === codProduto);
    if (produtoIndex === -1) {
      alert('Produto não encontrado!');
      limparInput();
      return;
    }

    const updatedLista = [...lista];
    updatedLista.splice(produtoIndex, 1);
    setLista(updatedLista);
    limparInput();
  };

  const limparInput = () => {
    setCodProduto('');
    setDescProduto('');
    setPrecoProduto('');
    setQuantProduto('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_input}>
        <TextInput
          style={styles.entrada}
          placeholder="Codigo"
          placeholderTextColor="darkorange"
          keyboardType="numeric"
          value={codProduto}
          onChangeText={(valor) => {
            setCodProduto(valor);
          }}
        />

        <TextInput
          style={styles.entrada}
          placeholder="Descricao"
          placeholderTextColor="darkorange"
          value={descProduto}
          onChangeText={(valor) => {
            setDescProduto(valor);
          }}
        />

        <TextInput
          style={styles.entrada}
          placeholder="Preço"
          placeholderTextColor="darkorange"
          keyboardType="numeric"
          value={precoProduto}
          onChangeText={(valor) => {
            setPrecoProduto(valor);
          }}
        />
        <TextInput
          style={styles.entrada}
          placeholder="Quantidade"
          placeholderTextColor="darkorange"
          keyboardType="numeric"
          value={quantProduto}
          onChangeText={(valor) => {
            setQuantProduto(valor);
          }}
        />

        <View style={styles.botoes}>
          <TouchableOpacity style={styles.botao} onPress={addProduto}>
            <Text>ADICIONAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={alteraProduto}>
            <Text>ALTERAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={apagarProduto}>
            <Text>APAGAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <FlatList
          data={lista}
          showVerticalScrollIndicator={true}
          renderItem={({ item }) => (
            <Text style={styles.itemLista}>
              {'[' + item.codigo + '] ' + item.descricao}
              {'\n'}
              {'Preço: R$' + item.preco}
              {'\n'}
              {'Quantidade: ' + item.quantidade}
            </Text>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  container_input: {
    marginTop: 150,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
  },
  entrada: {
    textAlign: 'center',
    borderWidth: 2,
    marginBottom: 5,
    fontSize: 30,
    textColor: 'red',
  },
  botao: {
    alignItems: 'center',
    backgroundColor: 'gold',
    padding: 10,
    marginBottom: 5,
    borderRadius: 15,
    fontSize: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  itemLista: {
    marginBottom: 1,
    fontSize: 23,
    color: 'black',
    borderBottomWidth: 3,
  },
});
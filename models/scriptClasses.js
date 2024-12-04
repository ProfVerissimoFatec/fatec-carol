class Usuario {
  constructor(id, nome, email, senha, telefone, tipo) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.telefone = telefone;
      this.tipo = tipo;  // 'USER' ou 'ADM'
  }

  save() {
      console.log('Salvando usuário no banco de dados...');
      // Simulação de salvar o documento no MongoDB
  }
}

class Prestador {
  constructor(id, usuarioId, cnpj, endereco, nomeEmpresa) {
      this.id = id;
      this.usuarioId = usuarioId;
      this.cnpj = cnpj;
      this.endereco = endereco;
      this.nomeEmpresa = nomeEmpresa;
  }

  save() {
      console.log('Salvando prestador no banco de dados...');
      // Simulação de salvar o documento no MongoDB
  }
}

class Anuncio {
  constructor(id, prestadorId, descricao) {
      this.id = id;
      this.prestadorId = prestadorId;
      this.descricao = descricao;
  }

  save() {
      console.log('Salvando anúncio no banco de dados...');
      // Simulação de salvar o documento no MongoDB
  }
}

class Ocorrencia {
  constructor(id, anuncioId, usuarioId, titulo, descricao, preco, status) {
      this.id = id;
      this.anuncioId = anuncioId;
      this.usuarioId = usuarioId;
      this.titulo = titulo;
      this.descricao = descricao;
      this.preco = preco;
      this.status = status;  // 'ABERTO', 'EM PROCESSO', 'FECHADO'
  }

  save() {
      console.log('Salvando ocorrência no banco de dados...');
      // Simulação de salvar o documento no MongoDB
  }
}

class Conversa {
  constructor(id, prestadorId, usuarioId, mensagem, recebido, enviado, data) {
      this.id = id;
      this.prestadorId = prestadorId;
      this.usuarioId = usuarioId;
      this.mensagem = mensagem;
      this.recebido = recebido;
      this.enviado = enviado;
      this.data = data || new Date();
  }

  save() {
      console.log('Salvando conversa no banco de dados...');
      // Simulação de salvar o documento no MongoDB
  }
}

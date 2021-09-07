# Cadastro de Veículo

**RF**

- Deve ser possível cadastrar um novo veículo
- Deve ser possível listar todas as categorias

**RN**

- Não deve ser possível cadastrar um veículo com uma placa já existente
- Não deve ser possível alterar a placa de um veículo já cadastrado
- O veículo deve ser cadastrado com disponibilidade por padrão
- O usuário responsável pelo cadastro deve ser um administrador 

# Listagem de Veículos

**RF**

- Deve ser possível listar todos os veículos disponíveis
- Deve ser possível listar todos os veículos disponíveis pelo nome da categoria
- Deve ser possível listar todos os veículos disponíveis pelo nome da marca
- Deve ser possível listar todos os veículos disponíveis pelo nome do veículo

**RN**

- O usuário não precisa estar logado no sistema

# Cadastro de Especificação no Veículo

**RF**

- Deve ser possível cadastrar uma especificação para um veículo
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os veículos

**RN**

- Não deve ser possível cadastrar uma especifição para um veículo inexistente
- Não deve ser possível cadastar duas vezes uma  mesma especificação para o mesmo veículo
- O usuário responsável pelo cadastro deve ser um administrador

# Cadastro de Imagens do Veículo

**RF**

- Deve ser possível cadastrar a imagem do veículo
- Deve ser possível listar todos os veículos

**RNF**

- Utilizar o Multer para upload dos arquivos

**RN**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo veículo
- O usuário responsável pelo cadastro deve ser um administrador

# Aluguel de Veículo

**RF**

- Deve ser possível cadastrar um aluguel

**RN**

- O aluguel deve ter duração mínima de 24 horas
- Não deve ser possível cadastrar um novo aluguel caso exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso exista um aberto para o mesmo veículo

---

***LEGENDA***

RF -> Requisito Funcional

RN -> Regra de Negócio

RNF -> Requisito Não Funcional
var express = require('express'),
    app = express();

var fs  = require('fs');
var hbs = require('hbs');
var _   = require('underscore');

// carregando "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
var db = {
  jogadores: JSON.parse(fs.readFileSync('server/data/jogadores.json')).players,
  jogosPorJogador: JSON.parse(fs.readFileSync('server/data/jogosPorJogador.json'))
};

// configuração de templating engine hbs (handlebars)
app.set('view engine', 'hbs');
app.set('views', 'server/views');


// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json

// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter umas 15 linhas de código


// EXERCÍCIO 1
// configuração para servir os arquivos estáticos da pasta "client"
app.use(express.static('client'));
// abertura do servidor na porta 3000
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

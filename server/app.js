/*_____________________________________________________
Centro Federal de Educação Tecnológica de Minas Gerais
Programação WEB: Geiser - Um registrador de jogos
Alunas: Daniele de Souza Lima
_____________________________________________________*/

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
// Rota para página inicial --> view index renderizada, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores

app.get('/', function(request, response) {
  response.render('index', {
    jogadores: db.jogadores
  });
});

// EXERCÍCIO 3
// Rota para página de detalhes de um jogador --> view ogador renderizada, 
// usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
app.get('/jogador/:id', function(request, response) {
  var jogador = _.findWhere(db.jogadores, {steamid: request.params.id});
  var jogJogador = db.jogosPorJogador[request.params.id];
  var jogosTodosJogador = jogJogador.games;
  jogador.qntJogos = jogJogador.game_count;
  var naoJogados = _.where(jogosTodosJogador, { playtime_forever: 0 })
  jogador.qntNJogados = naoJogados.length;

  jogosTodosJogador.forEach(function(jogo){
    jogo.playtimeHours = Math.ceil(jogo.playtime_forever/60);
  })

  var melhores = _.sortBy(jogosTodosJogador, function(jogo){
      return -jogo.playtime_forever;
  });

  jogador.principal = _.first(melhores, 1)[0];
  jogador.top5 = _.first(melhores, 5);

  response.render('jogador', {jogador});
});

// EXERCÍCIO 1
// configuração para servir os arquivos estáticos da pasta "client"
app.use(express.static('client'));
// abertura do servidor na porta 3000
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

import React, { useState, useEffect, useRef } from 'react';
import {
  Flame, BookOpen, Trophy, CalendarDays, Check, X, Lock, Crown, Users, Loader2,
  Camera, Mic, ChevronLeft, ChevronRight, Plus, Trash2, FileText,
  Sun, Moon, Share2, Cake, BellRing, ArrowLeft, Sparkles, LogOut, Gem, Award, RefreshCw,
  CalendarClock, AlertTriangle,
  Megaphone, Clock, MapPin, Star, Pencil,
} from 'lucide-react';

/* ---------------------------------------------------------
   BANCO DE PERGUNTAS
--------------------------------------------------------- */
const BANCO = [
  { t: 'm', p: 'Quem construiu a arca para sobreviver ao dilúvio?', o: ['Noé', 'Abraão', 'Moisés', 'Davi'], c: 0 },
  { t: 'm', p: 'Quantos apóstolos Jesus escolheu?', o: ['10', '12', '7', '14'], c: 1 },
  { t: 'v', p: 'Golias era um gigante filisteu derrotado por Davi.', c: 0 },
  { t: 'm', p: 'Em que cidade Jesus nasceu?', o: ['Nazaré', 'Jerusalém', 'Belém', 'Cafarnaum'], c: 2 },
  { t: 'm', p: 'Quem traiu Jesus por 30 moedas de prata?', o: ['Pedro', 'Judas Iscariotes', 'Tomé', 'João'], c: 1 },
  { t: 'v', p: 'Moisés recebeu os dez mandamentos no Monte Sinai.', c: 0 },
  { t: 'm', p: 'Quantos dias e noites choveu durante o dilúvio?', o: ['7', '40', '100', '12'], c: 1 },
  { t: 'm', p: 'Quem foi jogado na cova dos leões e sobreviveu?', o: ['Daniel', 'Jonas', 'José', 'Elias'], c: 0 },
  { t: 'v', p: 'Jonas foi engolido por um grande peixe.', c: 0 },
  { t: 'm', p: 'Qual era a profissão de Pedro antes de seguir Jesus?', o: ['Pastor', 'Pescador', 'Carpinteiro', 'Coletor de impostos'], c: 1 },
  { t: 'm', p: 'Quem foi vendido como escravo pelos próprios irmãos?', o: ['José', 'Benjamim', 'Rúben', 'Judá'], c: 0 },
  { t: 'v', p: 'Sansão perdeu sua força depois de cortarem seu cabelo.', c: 0 },
  { t: 'm', p: 'Quantos livros tem o Novo Testamento?', o: ['27', '39', '66', '12'], c: 0 },
  { t: 'm', p: 'Quem liderou o povo de Israel para fora do Egito?', o: ['Josué', 'Moisés', 'Arão', 'Davi'], c: 1 },
  { t: 'v', p: 'Davi enfrentou Golias apenas com uma funda e pedras.', c: 0 },
  { t: 'm', p: 'Em que monte Jesus foi crucificado?', o: ['Monte Sinai', 'Monte das Oliveiras', 'Gólgota', 'Monte Carmelo'], c: 2 },
  { t: 'm', p: 'Quem negou conhecer Jesus três vezes?', o: ['Pedro', 'Tiago', 'João', 'André'], c: 0 },
  { t: 'v', p: 'Paulo, antes de sua conversão, era conhecido como Saulo e perseguia os cristãos.', c: 0 },
  { t: 'm', p: 'Quantos pães e peixes Jesus usou para alimentar a multidão?', o: ['5 pães e 2 peixes', '2 pães e 5 peixes', '7 pães e 3 peixes', '3 pães e 7 peixes'], c: 0 },
  { t: 'm', p: 'Quem foi a primeira mulher, segundo Gênesis?', o: ['Sara', 'Eva', 'Rebeca', 'Rute'], c: 1 },
  { t: 'v', p: 'Noemi era a sogra de Rute.', c: 0 },
  { t: 'm', p: "Qual apóstolo era conhecido como 'o discípulo amado'?", o: ['Pedro', 'Tiago', 'João', 'Filipe'], c: 2 },
  { t: 'm', p: 'Quem construiu o templo de Jerusalém, filho de Davi?', o: ['Salomão', 'Roboão', 'Ezequias', 'Josias'], c: 0 },
  { t: 'v', p: 'Jesus transformou água em vinho em um casamento em Caná.', c: 0 },
  { t: 'm', p: 'Quem foi o pai de João Batista?', o: ['Zacarias', 'José', 'Simão', 'Levi'], c: 0 },
  { t: 'v', p: 'Jesus caminhou sobre as águas do mar da Galileia.', c: 0 },
  { t: 'm', p: 'Quantos anos os israelitas passaram no deserto antes de entrar na terra prometida?', o: ['10', '40', '100', '400'], c: 1 },
  { t: 'm', p: 'Quem interpretou o sonho do Faraó no Egito?', o: ['Moisés', 'José', 'Daniel', 'Salomão'], c: 1 },
  { t: 'v', p: 'Pedro andou sobre a água em direção a Jesus, mas começou a afundar.', c: 0 },
  { t: 'm', p: 'Qual foi o primeiro milagre de Jesus, segundo o evangelho de João?', o: ['Multiplicação dos pães', 'Água em vinho', 'Cura de um cego', 'Ressurreição de Lázaro'], c: 1 },
  { t: 'm', p: 'Quem foi expulso do Jardim do Éden junto com Eva?', o: ['Adão', 'Caim', 'Abel', 'Noé'], c: 0 },
  { t: 'm', p: 'Quem matou seu irmão Abel?', o: ['Caim', 'Sete', 'Enoque', 'Lameque'], c: 0 },
  { t: 'm', p: 'Qual era o nome da esposa de Abraão?', o: ['Sara', 'Rebeca', 'Lia', 'Raquel'], c: 0 },
  { t: 'm', p: 'Qual era o nome do filho de Abraão que quase foi sacrificado no Monte Moriá?', o: ['Isaque', 'Ismael', 'Jacó', 'Esaú'], c: 0 },
  { t: 'm', p: 'Quem foi o pai de Jacó e Esaú?', o: ['Isaque', 'Abraão', 'Labão', 'Ismael'], c: 0 },
  { t: 'm', p: 'Após lutar com um anjo, o nome de Jacó foi mudado para quê?', o: ['Israel', 'Judá', 'Efraim', 'Levi'], c: 0 },
  { t: 'm', p: 'Quantos filhos Jacó teve, que originaram as doze tribos de Israel?', o: ['10', '12', '14', '7'], c: 1 },
  { t: 'v', p: 'Deus destruiu Sodoma e Gomorra por causa da maldade das cidades.', c: 0 },
  { t: 'm', p: 'Quem foi transformada em estátua de sal ao olhar para trás, ao fugir de Sodoma?', o: ['A esposa de Ló', 'Sara', 'Agar', 'Rebeca'], c: 0 },
  { t: 'v', p: 'Abraão teve um filho chamado Ismael com Agar, serva de Sara.', c: 0 },
  { t: 'm', p: 'Quantos anos Matusalém viveu, segundo Gênesis?', o: ['969', '500', '120', '777'], c: 0 },
  { t: 'm', p: 'Quem foi o irmão gêmeo de Jacó?', o: ['Esaú', 'Labão', 'Rúben', 'Judá'], c: 0 },
  { t: 'v', p: 'Jacó trabalhou catorze anos para poder se casar com Raquel.', c: 0 },
  { t: 'm', p: 'Onde Moisés viu a sarça ardente?', o: ['No deserto', 'No Egito', 'No Monte Sinai', 'Na terra prometida'], c: 0 },
  { t: 'm', p: 'Quantas pragas Deus enviou sobre o Egito?', o: ['7', '10', '12', '9'], c: 1 },
  { t: 'm', p: 'Qual foi a última das pragas do Egito?', o: ['Morte dos primogênitos', 'Gafanhotos', 'Trevas', 'Rãs'], c: 0 },
  { t: 'm', p: 'Como se chamava a irmã de Moisés?', o: ['Miriã', 'Débora', 'Ana', 'Raquel'], c: 0 },
  { t: 'm', p: 'Quem era o irmão de Moisés que falava por ele diante do Faraó?', o: ['Arão', 'Josué', 'Calebe', 'Neemias'], c: 0 },
  { t: 'v', p: 'Moisés atravessou o Mar Vermelho com o povo de Israel, que foi dividido em duas partes.', c: 0 },
  { t: 'm', p: 'Quem sucedeu Moisés como líder de Israel?', o: ['Josué', 'Calebe', 'Arão', 'Gideão'], c: 0 },
  { t: 'v', p: 'Os israelitas comiam maná no deserto.', c: 0 },
  { t: 'm', p: 'Onde os dez mandamentos eram guardados?', o: ['Na Arca da Aliança', 'No Templo de Salomão', 'Na tenda de Moisés', 'Na Torre de Babel'], c: 0 },
  { t: 'm', p: 'Quantos espias foram enviados para explorar a terra de Canaã?', o: ['12', '10', '7', '2'], c: 0 },
  { t: 'm', p: 'Quantos dos espias enviados a Canaã deram um relatório favorável (Josué e Calebe)?', o: ['2', '5', '10', '12'], c: 0 },
  { t: 'm', p: 'Quem foi a única juíza mulher de Israel mencionada na Bíblia?', o: ['Débora', 'Rute', 'Ester', 'Miriã'], c: 0 },
  { t: 'm', p: 'Quem derrotou mil filisteus usando a queixada de um jumento?', o: ['Sansão', 'Gideão', 'Davi', 'Josué'], c: 0 },
  { t: 'm', p: 'Quem foi o primeiro rei de Israel?', o: ['Saul', 'Davi', 'Salomão', 'Roboão'], c: 0 },
  { t: 'm', p: 'Quem sucedeu Saul como rei de Israel?', o: ['Davi', 'Salomão', 'Jônatas', 'Absalão'], c: 0 },
  { t: 'm', p: 'Quem foi o filho de Davi que se tornou o rei mais sábio de Israel?', o: ['Salomão', 'Absalão', 'Adonias', 'Roboão'], c: 0 },
  { t: 'v', p: 'O rei Salomão pediu sabedoria a Deus, em vez de riquezas.', c: 0 },
  { t: 'm', p: 'Após a morte de Salomão, em quantos reinos Israel se dividiu?', o: ['2', '3', '4', '1'], c: 0 },
  { t: 'm', p: 'Quem foi o profeta que confrontou os profetas de Baal no Monte Carmelo?', o: ['Elias', 'Eliseu', 'Isaías', 'Jeremias'], c: 0 },
  { t: 'v', p: 'O profeta Elias foi levado ao céu num redemoinho, com um carro de fogo.', c: 0 },
  { t: 'm', p: 'Quem foi o sucessor do profeta Elias?', o: ['Eliseu', 'Isaías', 'Amós', 'Oséias'], c: 0 },
  { t: 'm', p: 'Qual rainha incentivou a adoração a Baal em Israel?', o: ['Jezabel', 'Ester', 'Atalia', 'Herodíades'], c: 0 },
  { t: 'm', p: 'Qual rei teve um sonho com uma estátua de metais diferentes, interpretado por Daniel?', o: ['Nabucodonosor', 'Ciro', 'Dario', 'Belsazar'], c: 0 },
  { t: 'v', p: 'Três amigos de Daniel foram lançados numa fornalha ardente e saíram ilesos.', c: 0 },
  { t: 'm', p: 'Quais eram os nomes dos três amigos de Daniel levados para a Babilônia?', o: ['Sadraque, Mesaque e Abede-Nego', 'Pedro, Tiago e João', 'Simeão, Levi e Judá', 'Gom, Magogue e Rosh'], c: 0 },
  { t: 'm', p: 'Quem interpretou a escrita misteriosa na parede durante o banquete do rei Belsazar?', o: ['Daniel', 'José', 'Isaías', 'Ezequiel'], c: 0 },
  { t: 'm', p: 'Quem é considerado autor da maior parte dos Provérbios?', o: ['Salomão', 'Davi', 'Moisés', 'Neemias'], c: 0 },
  { t: 'v', p: 'O livro de Jó trata do sofrimento de um homem justo.', c: 0 },
  { t: 'm', p: 'Quantos filhos e filhas Jó teve no início da história?', o: ['10', '7', '12', '3'], c: 0 },
  { t: 'm', p: 'Qual livro da Bíblia é uma coleção de cânticos e orações, muitos atribuídos a Davi?', o: ['Salmos', 'Provérbios', 'Eclesiastes', 'Cantares'], c: 0 },
  { t: 'v', p: 'No final da história, Deus restaurou a Jó em dobro tudo o que ele havia perdido.', c: 0 },
  { t: 'm', p: 'Para onde Jonas estava fugindo quando foi parar em um navio?', o: ['Társis', 'Nínive', 'Babilônia', 'Egito'], c: 0 },
  { t: 'm', p: 'Para qual cidade Deus enviou Jonas pregar, e ele inicialmente fugiu?', o: ['Nínive', 'Sodoma', 'Babilônia', 'Jerusalém'], c: 0 },
  { t: 'm', p: 'Qual profeta é conhecido por seu livro de Lamentações?', o: ['Jeremias', 'Isaías', 'Ezequiel', 'Daniel'], c: 0 },
  { t: 'v', p: 'O profeta Isaías profetizou sobre o nascimento de um menino chamado Emanuel.', c: 0 },
  { t: 'm', p: 'Qual profeta viu uma visão de ossos secos que voltavam à vida?', o: ['Ezequiel', 'Daniel', 'Jeremias', 'Oséias'], c: 0 },
  { t: 'm', p: 'Rute era de qual povo antes de se juntar ao povo de Israel?', o: ['Moabita', 'Filisteia', 'Egípcia', 'Amonita'], c: 0 },
  { t: 'm', p: 'Quem foi o parente-redentor que se casou com Rute?', o: ['Boaz', 'Obede', 'Manasseh', 'Elimeleque'], c: 0 },
  { t: 'v', p: 'Ester se tornou rainha da Pérsia e ajudou a salvar seu povo de um extermínio planejado.', c: 0 },
  { t: 'm', p: 'Quem era o vilão que planejou exterminar os judeus no livro de Ester?', o: ['Hamã', 'Mardoqueu', 'Assuero', 'Zorobabel'], c: 0 },
  { t: 'm', p: 'Quem era o primo que criou Ester?', o: ['Mardoqueu', 'Neemias', 'Esdras', 'Zorobabel'], c: 0 },
  { t: 'm', p: 'Quem anunciou a Maria que ela conceberia o Filho de Deus?', o: ['O anjo Gabriel', 'O anjo Miguel', 'José', 'João Batista'], c: 0 },
  { t: 'v', p: 'Jesus nasceu em uma manjedoura porque não havia lugar na hospedaria.', c: 0 },
  { t: 'm', p: 'Quem visitou Jesus recém-nascido, guiado por uma estrela?', o: ['Os magos do Oriente', 'Os pastores', 'Os anjos', 'Os sacerdotes'], c: 0 },
  { t: 'v', p: 'Os pastores foram os primeiros a receber a notícia do nascimento de Jesus, através de anjos.', c: 0 },
  { t: 'm', p: 'Para onde José e Maria fugiram com Jesus, para escapar do rei Herodes?', o: ['Egito', 'Babilônia', 'Roma', 'Grécia'], c: 0 },
  { t: 'm', p: 'Quem batizou Jesus no rio Jordão?', o: ['João Batista', 'Pedro', 'André', 'Filipe'], c: 0 },
  { t: 'v', p: 'Depois do batismo de Jesus, uma voz do céu declarou que Ele era o Filho amado de Deus.', c: 0 },
  { t: 'm', p: 'Por quantos dias Jesus jejuou no deserto antes de ser tentado?', o: ['40', '30', '7', '3'], c: 0 },
  { t: 'm', p: 'Qual era a profissão de Mateus antes de seguir Jesus?', o: ['Cobrador de impostos', 'Pescador', 'Médico', 'Carpinteiro'], c: 0 },
  { t: 'v', p: 'Lucas, autor de um dos evangelhos, era médico.', c: 0 },
  { t: 'm', p: 'Qual discípulo duvidou da ressurreição até tocar nas feridas de Jesus?', o: ['Tomé', 'Judas', 'Filipe', 'Bartolomeu'], c: 0 },
  { t: 'm', p: "Qual discípulo era conhecido como 'o zelote'?", o: ['Simão', 'André', 'Tiago', 'Judas'], c: 0 },
  { t: 'm', p: 'Na parábola do filho pródigo, o que o filho mais novo pediu ao pai?', o: ['Sua parte da herança', 'Um emprego', 'Uma esposa', 'Perdão'], c: 0 },
  { t: 'm', p: 'Na parábola do bom samaritano, quem ajudou o homem ferido na estrada?', o: ['Um samaritano', 'Um sacerdote', 'Um levita', 'Um fariseu'], c: 0 },
  { t: 'v', p: 'Na parábola do bom samaritano, um sacerdote e um levita passaram pelo homem ferido sem ajudá-lo.', c: 0 },
  { t: 'm', p: 'Na parábola do semeador, o que a semente representa?', o: ['A palavra de Deus', 'O dinheiro', 'O amor', 'A fé'], c: 0 },
  { t: 'm', p: 'Na parábola das dez virgens, o que faltou às virgens insensatas?', o: ['Óleo para suas lâmpadas', 'Comida', 'Dinheiro', 'Roupas'], c: 0 },
  { t: 'm', p: 'Na parábola dos talentos, o que aconteceu com o servo que enterrou seu talento?', o: ['Foi repreendido pelo senhor', 'Foi recompensado', 'Ganhou o dobro', 'Recebeu mais talentos'], c: 0 },
  { t: 'm', p: 'Na parábola da ovelha perdida, quantas ovelhas o pastor deixou para procurar a que se perdeu?', o: ['99', '100', '50', '9'], c: 0 },
  { t: 'v', p: 'Na parábola do fariseu e do publicano, foi o publicano humilde que saiu justificado diante de Deus.', c: 0 },
  { t: 'm', p: 'Quantas pessoas Jesus alimentou com cinco pães e dois peixes, sem contar mulheres e crianças?', o: ['5 mil', '4 mil', '10 mil', '500'], c: 0 },
  { t: 'v', p: 'Jesus ressuscitou Lázaro depois que ele já estava morto havia quatro dias.', c: 0 },
  { t: 'm', p: "Quem era a irmã de Lázaro que disse a Jesus 'se estivesses aqui, meu irmão não teria morrido'?", o: ['Marta', 'Maria Madalena', 'Salomé', 'Joana'], c: 0 },
  { t: 'v', p: 'Jesus curou um homem cego de nascença usando lama feita com terra e saliva.', c: 0 },
  { t: 'm', p: 'Jesus acalmou uma tempestade em qual mar?', o: ['Mar da Galileia', 'Mar Vermelho', 'Mar Morto', 'Mar Mediterrâneo'], c: 0 },
  { t: 'v', p: 'Jesus expulsou uma legião de demônios de um homem, que entraram numa manada de porcos.', c: 0 },
  { t: 'm', p: 'Jesus curou dez leprosos, mas quantos voltaram para agradecer?', o: ['Só um', 'Todos', 'Nenhum', 'Cinco'], c: 0 },
  { t: 'm', p: 'Em que monte Jesus orou antes de ser preso?', o: ['Getsêmani', 'Sinai', 'Carmelo', 'Tabor'], c: 0 },
  { t: 'm', p: 'Quem cortou a orelha de um servo durante a prisão de Jesus?', o: ['Pedro', 'João', 'Tiago', 'André'], c: 0 },
  { t: 'v', p: 'Pilatos lavou as mãos simbolicamente, dizendo estar inocente do sangue de Jesus.', c: 0 },
  { t: 'm', p: 'Quem carregou a cruz de Jesus parte do caminho?', o: ['Simão de Cirene', 'José de Arimateia', 'Nicodemos', 'Barrabás'], c: 0 },
  { t: 'm', p: 'Quem pediu o corpo de Jesus a Pilatos para sepultá-lo?', o: ['José de Arimateia', 'Nicodemos', 'Simão Pedro', 'Barrabás'], c: 0 },
  { t: 'm', p: 'Quem foi a primeira pessoa a ver Jesus ressuscitado, segundo o evangelho de João?', o: ['Maria Madalena', 'Pedro', 'João', 'Tomé'], c: 0 },
  { t: 'v', p: 'Jesus apareceu a dois discípulos na estrada de Emaús após a ressurreição.', c: 0 },
  { t: 'm', p: 'Quantos dias Jesus ficou na terra depois de ressuscitar, antes de subir ao céu?', o: ['40', '3', '7', '50'], c: 0 },
  { t: 'm', p: 'No dia de Pentecostes, o que desceu sobre os discípulos?', o: ['O Espírito Santo', 'Um anjo', 'Fogo do céu', 'Uma nuvem'], c: 0 },
  { t: 'v', p: 'No dia de Pentecostes, os discípulos passaram a falar em outras línguas.', c: 0 },
  { t: 'm', p: 'Quem foi o primeiro mártir cristão, apedrejado por sua fé?', o: ['Estêvão', 'Tiago', 'Pedro', 'Filipe'], c: 0 },
  { t: 'm', p: 'Onde Paulo teve a visão que o converteu ao cristianismo?', o: ['Na estrada para Damasco', 'Em Roma', 'Em Jerusalém', 'Em Atenas'], c: 0 },
  { t: 'v', p: 'Paulo ficou temporariamente cego após sua conversão na estrada de Damasco.', c: 0 },
  { t: 'm', p: 'Quem foi o primeiro gentio (não-judeu) batizado, segundo o livro de Atos?', o: ['Cornélio', 'Timóteo', 'Tito', 'Lucas'], c: 0 },
  { t: 'm', p: 'Paulo e Silas foram presos e, à meia-noite, o que aconteceu na prisão?', o: ['Um terremoto abriu as portas', 'Um anjo os libertou', 'O carcereiro os soltou', 'Fugiram escondidos'], c: 0 },
  { t: 'v', p: 'O carcereiro de Paulo e Silas se converteu ao cristianismo depois do terremoto.', c: 0 },
  { t: 'm', p: 'Em qual ilha Paulo naufragou a caminho de Roma?', o: ['Malta', 'Chipre', 'Creta', 'Sicília'], c: 0 },
  { t: 'm', p: 'Quem era o companheiro de viagens de Paulo que também escreveu um evangelho?', o: ['Lucas', 'Marcos', 'Barnabé', 'Timóteo'], c: 0 },
  { t: 'm', p: 'Quem escreveu a maior parte das cartas (epístolas) do Novo Testamento?', o: ['Paulo', 'Pedro', 'João', 'Tiago'], c: 0 },
  { t: 'v', p: 'A carta aos Efésios foi escrita por Paulo enquanto estava preso.', c: 0 },
  { t: 'm', p: 'Qual fruto do Espírito é mencionado primeiro em Gálatas 5?', o: ['Amor', 'Paz', 'Alegria', 'Paciência'], c: 0 },
  { t: 'v', p: "A Bíblia diz que 'o amor é paciente, o amor é bondoso' em 1 Coríntios 13.", c: 0 },
  { t: 'm', p: 'Quantos livros tem o Antigo Testamento?', o: ['39', '27', '66', '46'], c: 0 },
  { t: 'm', p: 'Quantos livros tem a Bíblia toda, somando os dois Testamentos?', o: ['66', '73', '39', '27'], c: 0 },
  { t: 'm', p: 'Qual é o último livro da Bíblia?', o: ['Apocalipse', 'Judas', '3 João', 'Malaquias'], c: 0 },
  { t: 'm', p: 'Quem escreveu o livro de Apocalipse?', o: ['João', 'Pedro', 'Paulo', 'Lucas'], c: 0 },
  { t: 'v', p: 'O livro de Apocalipse foi escrito enquanto seu autor estava exilado na ilha de Patmos.', c: 0 },
  { t: 'm', p: 'Em qual cidade Jesus foi crucificado?', o: ['Jerusalém', 'Belém', 'Nazaré', 'Cafarnaum'], c: 0 },
  { t: 'm', p: 'Em qual cidade Jesus cresceu?', o: ['Nazaré', 'Belém', 'Jerusalém', 'Cafarnaum'], c: 0 },
  { t: 'm', p: 'Qual era a capital do reino de Israel unido sob Davi e Salomão?', o: ['Jerusalém', 'Samaria', 'Belém', 'Hebrom'], c: 0 },
  { t: 'v', p: 'O rio Jordão é mencionado várias vezes na Bíblia como lugar de travessia e batismo.', c: 0 },
  { t: 'm', p: 'Em qual monte Abraão quase sacrificou Isaque?', o: ['Moriá', 'Sinai', 'Carmelo', 'Nebo'], c: 0 },
  { t: 'm', p: 'Qual apóstolo era irmão de Pedro?', o: ['André', 'Tiago', 'João', 'Filipe'], c: 0 },
  { t: 'm', p: 'Quem foi a mãe de Samuel, que orou insistentemente por um filho?', o: ['Ana', 'Ester', 'Rute', 'Sara'], c: 0 },
  { t: 'v', p: 'Débora foi tanto profetisa quanto juíza de Israel.', c: 0 },
  { t: 'm', p: 'Quem escondeu os espias israelitas em Jericó?', o: ['Raabe', 'Rute', 'Débora', 'Jael'], c: 0 },
  { t: 'm', p: 'Quem era a mãe de Moisés, que o escondeu num cesto no rio Nilo?', o: ['Joquebede', 'Miriã', 'Séfora', 'Zípora'], c: 0 },
  { t: 'm', p: 'Quem era a esposa de Moisés?', o: ['Séfora', 'Miriã', 'Débora', 'Rute'], c: 0 },
  { t: 'v', p: 'Maria, irmã de Marta e Lázaro, ungiu os pés de Jesus com perfume caro.', c: 0 },
  { t: 'm', p: 'Quem era o rei que ordenou a morte de João Batista?', o: ['Herodes', 'Pilatos', 'César Augusto', 'Herodes Agripa'], c: 0 },
  { t: 'v', p: 'João Batista foi decapitado a pedido da filha de Herodias.', c: 0 },
  { t: 'm', p: 'Quem foi transfigurado num monte diante de Pedro, Tiago e João, ao lado de Moisés e Elias?', o: ['Jesus', 'João Batista', 'Estêvão', 'Filipe'], c: 0 },
  { t: 'v', p: 'No Monte da Transfiguração, uma nuvem cobriu os discípulos e uma voz falou do céu.', c: 0 },
  { t: 'm', p: 'Quantas moedas de prata Judas recebeu para trair Jesus?', o: ['30', '40', '12', '100'], c: 0 },
  { t: 'm', p: 'Quem foi o pai do rei Salomão?', o: ['Davi', 'Saul', 'Roboão', 'Jessé'], c: 0 },
  { t: 'm', p: 'Quem foi o pai de Davi?', o: ['Jessé', 'Saul', 'Salomão', 'Boaz'], c: 0 },
  { t: 'v', p: 'Davi era o mais novo entre os filhos de Jessé quando foi escolhido rei.', c: 0 },
  { t: 'm', p: 'Quem era o melhor amigo de Davi, filho do rei Saul?', o: ['Jônatas', 'Absalão', 'Salomão', 'Abner'], c: 0 },
  { t: 'v', p: 'O rei Saul perseguiu Davi por inveja e medo de perder o trono.', c: 0 },
  { t: 'm', p: 'Qual filho de Davi se rebelou contra ele e tentou tomar o trono?', o: ['Absalão', 'Salomão', 'Adonias', 'Amnon'], c: 0 },
  { t: 'm', p: 'Quem construiu os muros de Jerusalém após o exílio na Babilônia?', o: ['Neemias', 'Esdras', 'Zorobabel', 'Ageu'], c: 0 },
  { t: 'm', p: 'Quem liderou o povo de volta a Jerusalém para reconstruir o templo?', o: ['Zorobabel', 'Neemias', 'Esdras', 'Josué'], c: 0 },
  { t: 'v', p: 'Os israelitas ficaram setenta anos exilados na Babilônia, segundo a profecia de Jeremias.', c: 0 },
  { t: 'm', p: 'Qual foi o nome da torre que os homens tentaram construir até o céu?', o: ['Torre de Babel', 'Torre de Siloé', 'Torre de Davi', 'Torre de Jerico'], c: 0 },
  { t: 'v', p: 'Deus confundiu as línguas dos homens na Torre de Babel para impedir a construção.', c: 0 },
  { t: 'm', p: 'Quem foi o primeiro rei mencionado na Bíblia a governar sobre um grande império, associado a Babel?', o: ['Ninrode', 'Nabucodonosor', 'Ciro', 'Dario'], c: 0 },
  { t: 'm', p: 'Qual anjo apareceu a Daniel para explicar visões?', o: ['Gabriel', 'Miguel', 'Rafael', 'Uriel'], c: 0 },
  { t: 'm', p: 'Qual arcanjo é descrito lutando contra o dragão no livro de Apocalipse?', o: ['Miguel', 'Gabriel', 'Rafael', 'Uriel'], c: 0 },
  { t: 'm', p: 'Quantos anos Jesus tinha, aproximadamente, quando começou seu ministério público?', o: ['30', '33', '12', '40'], c: 0 },
  { t: 'v', p: 'Jesus, aos doze anos, ficou para trás em Jerusalém discutindo com os mestres no templo.', c: 0 },
  { t: 'm', p: 'Qual era o nome do poço onde Jesus conversou com uma mulher samaritana?', o: ['Poço de Jacó', 'Poço de Betesda', 'Poço de Siloé', 'Poço de Berseba'], c: 0 },
  { t: 'm', p: 'Em qual tanque Jesus curou um paralítico que esperava havia 38 anos?', o: ['Tanque de Betesda', 'Tanque de Siloé', 'Mar da Galileia', 'Rio Jordão'], c: 0 },
  { t: 'v', p: 'Jesus curou um paralítico e disse a ele para pegar seu leito e andar.', c: 0 },
  { t: 'm', p: 'Quem era Zaqueu, que subiu numa árvore para ver Jesus?', o: ['Um cobrador de impostos', 'Um pescador', 'Um fariseu', 'Um sacerdote'], c: 0 },
  { t: 'v', p: 'Zaqueu prometeu devolver quatro vezes mais a quem ele havia enganado.', c: 0 },
  { t: 'm', p: 'Quem foi curada apenas por tocar na roupa de Jesus, após anos de hemorragia?', o: ['Uma mulher da multidão', 'Maria Madalena', 'A sogra de Pedro', 'A filha de Jairo'], c: 0 },
  { t: 'm', p: 'Jesus ressuscitou a filha de qual líder da sinagoga?', o: ['Jairo', 'Zaqueu', 'Nicodemos', 'Simão'], c: 0 },
  { t: 'm', p: 'Quem era Nicodemos, que visitou Jesus à noite?', o: ['Um fariseu, líder religioso judeu', 'Um pescador', 'Um cobrador de impostos', 'Um centurião romano'], c: 0 },
  { t: 'v', p: 'Jesus disse a Nicodemos que era necessário nascer de novo para ver o Reino de Deus.', c: 0 },
  { t: 'm', p: 'Qual centurião romano teve seu servo curado por Jesus à distância?', o: ['Um centurião em Cafarnaum', 'Cornélio', 'Pilatos', 'Júlio'], c: 0 },
  { t: 'm', p: 'Quem foi condenado no lugar de Jesus, sendo solto pelo povo?', o: ['Barrabás', 'Judas', 'Caifás', 'Anás'], c: 0 },
  { t: 'm', p: 'Quem era o sumo sacerdote que julgou Jesus?', o: ['Caifás', 'Anás', 'Pilatos', 'Herodes'], c: 0 },
  { t: 'v', p: 'Pedro chorou amargamente depois de negar Jesus três vezes.', c: 0 },
  { t: 'm', p: 'Qual apóstolo escreveu duas cartas conhecidas como 1 e 2 Pedro?', o: ['Pedro', 'Paulo', 'Tiago', 'João'], c: 0 },
  { t: 'm', p: 'Qual apóstolo é tradicionalmente associado ao evangelho e três cartas com seu nome?', o: ['João', 'Pedro', 'Tiago', 'Judas'], c: 0 },
  { t: 'v', p: 'Tiago, irmão de Jesus, escreveu uma carta que leva seu nome no Novo Testamento.', c: 0 },
  { t: 'm', p: 'Qual era o ofício de Lídia, uma das primeiras convertidas na Europa?', o: ['Vendedora de tecidos de púrpura', 'Costureira', 'Padeira', 'Agricultora'], c: 0 },
  { t: 'm', p: "Em qual cidade a igreja cristã foi chamada pela primeira vez de 'cristã'?", o: ['Antioquia', 'Jerusalém', 'Roma', 'Éfeso'], c: 0 },
  { t: 'v', p: 'Timóteo era um jovem discípulo e colaborador próximo do apóstolo Paulo.', c: 0 },
  { t: 'm', p: 'Qual era a profissão de Paulo, além de apóstolo?', o: ['Fabricante de tendas', 'Pescador', 'Carpinteiro', 'Médico'], c: 0 },
  { t: 'm', p: 'Quem acompanhou Paulo em sua primeira viagem missionária, antes de se separarem?', o: ['Barnabé', 'Silas', 'Lucas', 'Tito'], c: 0 },
  { t: 'v', p: 'Paulo e Barnabé se separaram após um desentendimento sobre levar Marcos numa viagem.', c: 0 },
  { t: 'm', p: 'Qual discípulo traiu Jesus e depois se enforcou de remorso?', o: ['Judas Iscariotes', 'Tomé', 'Filipe', 'Bartolomeu'], c: 0 },
  { t: 'm', p: 'Qual era o nome do monte de onde Jesus subiu ao céu?', o: ['Monte das Oliveiras', 'Monte Sinai', 'Monte Carmelo', 'Monte Tabor'], c: 0 },
  { t: 'v', p: 'Antes de subir ao céu, Jesus prometeu enviar o Espírito Santo aos discípulos.', c: 0 },
  { t: 'm', p: 'Qual profeta foi levado ao céu sem morrer, além de Elias?', o: ['Enoque', 'Moisés', 'Elias', 'Isaías'], c: 0 },
  { t: 'v', p: "A Bíblia diz que Enoque 'andou com Deus' e depois desapareceu, pois Deus o tomou.", c: 0 },
  { t: 'm', p: 'Quem foi o primeiro rei mencionado a fazer guerra contra Abraão para resgatar seu sobrinho Ló?', o: ['Quedorlaomer', 'Ninrode', 'Faraó', 'Abimeleque'], c: 0 },
  { t: 'm', p: 'Qual era o nome do sobrinho de Abraão, que morava em Sodoma?', o: ['Ló', 'Ismael', 'Labão', 'Isaque'], c: 0 },
  { t: 'm', p: 'Quem foi enganado para casar primeiro com Lia antes de Raquel?', o: ['Jacó', 'Isaque', 'Labão', 'Esaú'], c: 0 },
  { t: 'v', p: 'Labão enganou Jacó, dando-lhe Lia em casamento antes de Raquel.', c: 0 },
  { t: 'm', p: 'Qual filho de Jacó recebeu uma túnica de várias cores?', o: ['José', 'Judá', 'Rúben', 'Benjamim'], c: 0 },
  { t: 'v', p: 'Os irmãos de José o venderam como escravo por inveja.', c: 0 },
  { t: 'm', p: 'No Egito, quem acusou José falsamente e o fez ser preso?', o: ['A esposa de Potifar', 'O Faraó', 'O copeiro', 'O padeiro'], c: 0 },
  { t: 'm', p: 'Qual cargo José assumiu no Egito depois de interpretar o sonho do Faraó?', o: ['Governador, segundo em comando depois do Faraó', 'Sacerdote', 'General do exército', 'Escravo do palácio'], c: 0 },
  { t: 'v', p: 'José perdoou seus irmãos quando eles foram ao Egito em busca de comida durante a fome.', c: 0 },
  { t: 'm', p: 'Quem foi o filho mais novo de Jacó, muito amado por ele?', o: ['Benjamim', 'José', 'Judá', 'Rúben'], c: 0 },
];

/* ---------------------------------------------------------
   REFLEXÕES DO DIA (aquecimento antes do quiz — paráfrases, sem citação literal)
--------------------------------------------------------- */
const REFLEXOES = [
  { ref: 'Salmos 119:105', versao: 'Almeida', texto: 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.' },
  { ref: 'Provérbios 3:5-6', versao: 'Almeida', texto: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' },
  { ref: 'Filipenses 4:6-7', versao: 'Almeida', texto: 'Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplicas, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.' },
  { ref: 'Josué 1:9', versao: 'Almeida', texto: 'Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.' },
  { ref: 'Salmos 23:1-3', versao: 'Almeida', texto: 'O Senhor é o meu pastor, nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas. Refrigera a minha alma.' },
  { ref: 'Mateus 6:33', versao: 'Almeida', texto: 'Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
  { ref: 'Gálatas 5:22-23', versao: 'Almeida', texto: 'Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.' },
  { ref: '1 Coríntios 13:4', versao: 'Almeida', texto: 'O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece.' },
  { ref: 'Salmos 46:1', versao: 'Almeida', texto: 'Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.' },
  { ref: 'Tiago 1:2-3', versao: 'Almeida', texto: 'Meus irmãos, tende grande gozo quando cairdes em várias tentações; sabendo que a prova da vossa fé produz a paciência.' },
  { ref: 'Isaías 40:31', versao: 'Almeida', texto: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.' },
  { ref: 'João 15:5', versao: 'Almeida', texto: 'Eu sou a videira, vós as varas. Quem está em mim, e eu nele, esse dá muito fruto; porque sem mim nada podeis fazer.' },
  { ref: 'Salmos 139:14', versao: 'Almeida', texto: 'Eu te louvarei, porque de um modo assombroso, e tão maravilhoso fui feito; maravilhosas são as tuas obras, e a minha alma o sabe muito bem.' },
  { ref: 'Efésios 2:8-9', versao: 'Almeida', texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' },
  { ref: 'Mateus 11:28', versao: 'Almeida', texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
  { ref: '2 Timóteo 1:7', versao: 'Almeida', texto: 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.' },
  { ref: 'Hebreus 11:1', versao: 'Almeida', texto: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
  { ref: 'Provérbios 17:17', versao: 'Almeida', texto: 'Em todo o tempo ama o amigo; e para a angústia nasceu o irmão.' },
  { ref: 'Salmos 27:1', versao: 'Almeida', texto: 'O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?' },
  { ref: 'Romanos 8:28', versao: 'Almeida', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.' },
  { ref: 'Gênesis 1:1', versao: 'Almeida', texto: 'No princípio, criou Deus os céus e a terra.' },
  { ref: 'Gênesis 1:27', versao: 'Almeida', texto: 'E criou Deus o homem à sua imagem; homem e mulher os criou.' },
  { ref: 'Êxodo 20:3', versao: 'Almeida', texto: 'Não terás outros deuses diante de mim.' },
  { ref: 'Êxodo 14:14', versao: 'Almeida', texto: 'O Senhor pelejará por vós, e vós vos calareis.' },
  { ref: 'Deuteronômio 6:5', versao: 'Almeida', texto: 'Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma, e de todas as tuas forças.' },
  { ref: 'Deuteronômio 31:6', versao: 'Almeida', texto: 'Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é o que vai contigo; não te deixará, nem te desamparará.' },
  { ref: 'Josué 1:8', versao: 'Almeida', texto: 'Não se aparte da tua boca o livro desta lei; antes medita nele dia e noite.' },
  { ref: 'Salmos 1:2', versao: 'Almeida', texto: 'O seu prazer está na lei do Senhor, e na sua lei medita de dia e de noite.' },
  { ref: 'Salmos 8:1', versao: 'Almeida', texto: 'Ó Senhor, Senhor nosso, quão admirável é o teu nome em toda a terra!' },
  { ref: 'Salmos 16:11', versao: 'Almeida', texto: 'Tu me farás ver a vereda da vida; na tua presença há fartura de alegria.' },
  { ref: 'Salmos 18:2', versao: 'Almeida', texto: 'O Senhor é o meu rochedo, e o meu lugar forte, e o meu libertador.' },
  { ref: 'Salmos 19:1', versao: 'Almeida', texto: 'Os céus declaram a glória de Deus e o firmamento anuncia a obra das suas mãos.' },
  { ref: 'Salmos 27:4', versao: 'Almeida', texto: 'Uma coisa pedi ao Senhor, e a buscarei: que possa morar na casa do Senhor todos os dias da minha vida.' },
  { ref: 'Salmos 30:5', versao: 'Almeida', texto: 'À tarde pode durar o choro, mas ao romper da manhã vem a alegria.' },
  { ref: 'Salmos 32:8', versao: 'Almeida', texto: 'Instruir-te-ei, e ensinar-te-ei o caminho que deves seguir; guiar-te-ei com os meus olhos.' },
  { ref: 'Salmos 34:8', versao: 'Almeida', texto: 'Provai, e vede que o Senhor é bom; bem-aventurado o homem que nele confia.' },
  { ref: 'Salmos 37:4', versao: 'Almeida', texto: 'Deleita-te também no Senhor, e ele te concederá o que deseja o teu coração.' },
  { ref: 'Salmos 42:1', versao: 'Almeida', texto: 'Como o cervo brama pelas correntes das águas, assim suspira a minha alma por ti, ó Deus.' },
  { ref: 'Salmos 51:10', versao: 'Almeida', texto: 'Cria em mim, ó Deus, um coração puro, e renova em mim um espírito reto.' },
  { ref: 'Salmos 55:22', versao: 'Almeida', texto: 'Lança a tua carga sobre o Senhor, e ele te susterá.' },
  { ref: 'Salmos 62:1', versao: 'Almeida', texto: 'A minha alma espera somente em Deus; dele vem a minha salvação.' },
  { ref: 'Salmos 91:1', versao: 'Almeida', texto: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
  { ref: 'Salmos 100:5', versao: 'Almeida', texto: 'O Senhor é bom, e eterna é a sua misericórdia; e a sua fidelidade dura de geração em geração.' },
  { ref: 'Salmos 103:2', versao: 'Almeida', texto: 'Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios.' },
  { ref: 'Salmos 118:24', versao: 'Almeida', texto: 'Este é o dia que o Senhor fez; regozijemo-nos, e alegremo-nos nele.' },
  { ref: 'Salmos 121:1-2', versao: 'Almeida', texto: 'Elevo os meus olhos aos montes, de onde vem o meu socorro. O meu socorro vem do Senhor.' },
  { ref: 'Salmos 126:5', versao: 'Almeida', texto: 'Os que semeiam em lágrimas segarão com alegria.' },
  { ref: 'Salmos 133:1', versao: 'Almeida', texto: 'Oh! Quão bom e quão suave é que os irmãos vivam em união!' },
  { ref: 'Salmos 145:18', versao: 'Almeida', texto: 'Perto está o Senhor de todos os que o invocam, de todos os que o invocam em verdade.' },
  { ref: 'Provérbios 1:7', versao: 'Almeida', texto: 'O temor do Senhor é o princípio do conhecimento; os loucos desprezam a sabedoria e a instrução.' },
  { ref: 'Provérbios 4:23', versao: 'Almeida', texto: 'Sobre tudo o que se deve guardar, guarda o teu coração, porque dele procedem as saídas da vida.' },
  { ref: 'Provérbios 10:12', versao: 'Almeida', texto: 'O ódio excita contendas, mas o amor cobre todas as transgressões.' },
  { ref: 'Provérbios 12:25', versao: 'Almeida', texto: 'A ansiedade no coração do homem o abate, mas uma boa palavra o alegra.' },
  { ref: 'Provérbios 15:1', versao: 'Almeida', texto: 'A resposta branda desvia o furor, mas a palavra dura suscita a ira.' },
  { ref: 'Provérbios 16:3', versao: 'Almeida', texto: 'Confia ao Senhor as tuas obras, e teus pensamentos serão estabelecidos.' },
  { ref: 'Provérbios 18:10', versao: 'Almeida', texto: 'Torre forte é o nome do Senhor; a ele correm os justos, e estão seguros.' },
  { ref: 'Provérbios 22:6', versao: 'Almeida', texto: 'Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele.' },
  { ref: 'Provérbios 27:17', versao: 'Almeida', texto: 'Como o ferro com o ferro se aguça, assim o homem aguça o rosto do seu amigo.' },
  { ref: 'Eclesiastes 3:1', versao: 'Almeida', texto: 'Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.' },
  { ref: 'Cantares 8:7', versao: 'Almeida', texto: 'As muitas águas não podem apagar este amor, nem os rios afogá-lo.' },
  { ref: 'Isaías 9:6', versao: 'Almeida', texto: 'Um menino nos nasceu, um filho se nos deu; e o seu nome será: Maravilhoso, Conselheiro, Deus Forte, Príncipe da Paz.' },
  { ref: 'Isaías 26:3', versao: 'Almeida', texto: 'Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.' },
  { ref: 'Isaías 41:10', versao: 'Almeida', texto: 'Não temas, porque eu sou contigo; eu te fortaleço, e te ajudo, e te sustento.' },
  { ref: 'Isaías 53:5', versao: 'Almeida', texto: 'Ele foi ferido pelas nossas transgressões, e moído pelas nossas iniquidades; e pelas suas pisaduras fomos sarados.' },
  { ref: 'Isaías 55:8', versao: 'Almeida', texto: 'Os meus pensamentos não são os vossos pensamentos, nem os vossos caminhos os meus caminhos, diz o Senhor.' },
  { ref: 'Jeremias 17:7', versao: 'Almeida', texto: 'Bendito o homem que confia no Senhor, e cuja esperança é o Senhor.' },
  { ref: 'Jeremias 29:11', versao: 'Almeida', texto: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal.' },
  { ref: 'Jeremias 33:3', versao: 'Almeida', texto: 'Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e ocultas, que não sabes.' },
  { ref: 'Lamentações 3:22-23', versao: 'Almeida', texto: 'As misericórdias do Senhor não têm fim; renovam-se cada manhã; grande é a tua fidelidade.' },
  { ref: 'Ezequiel 36:26', versao: 'Almeida', texto: 'Também vos darei um coração novo, e porei dentro de vós um espírito novo.' },
  { ref: 'Daniel 3:17', versao: 'Almeida', texto: 'O nosso Deus, a quem servimos, é poderoso para nos livrar da fornalha de fogo ardente.' },
  { ref: 'Miquéias 6:8', versao: 'Almeida', texto: 'Que é o que o Senhor pede de ti: que pratiques a justiça, e ames a beneficência, e andes humildemente com o teu Deus.' },
  { ref: 'Naum 1:7', versao: 'Almeida', texto: 'Bom é o Senhor, fortaleza no dia da angústia; e conhece os que confiam nele.' },
  { ref: 'Habacuque 3:19', versao: 'Almeida', texto: 'O Senhor Jeová é a minha força; ele faz os meus pés como os das cervas.' },
  { ref: 'Sofonias 3:17', versao: 'Almeida', texto: 'O Senhor teu Deus é grande, poderoso e salvador; ele se alegra em ti com alegria.' },
  { ref: 'Zacarias 4:6', versao: 'Almeida', texto: 'Não por força nem por violência, mas pelo meu Espírito, diz o Senhor dos Exércitos.' },
  { ref: 'Malaquias 3:10', versao: 'Almeida', texto: 'Provai-me nisto, diz o Senhor dos Exércitos, se eu não vos abrir as janelas do céu.' },
  { ref: 'Mateus 5:14', versao: 'Almeida', texto: 'Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte.' },
  { ref: 'Mateus 5:16', versao: 'Almeida', texto: 'Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras.' },
  { ref: 'Mateus 6:9-10', versao: 'Almeida', texto: 'Pai nosso, que estás nos céus, santificado seja o teu nome; venha o teu reino.' },
  { ref: 'Mateus 6:34', versao: 'Almeida', texto: 'Não vos inquieteis, pois, pelo dia de amanhã, porque o dia de amanhã cuidará de si mesmo.' },
  { ref: 'Mateus 7:7', versao: 'Almeida', texto: 'Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á.' },
  { ref: 'Mateus 11:29', versao: 'Almeida', texto: 'Tomai sobre vós o meu jugo, e aprendei de mim, que sou manso e humilde de coração.' },
  { ref: 'Mateus 18:20', versao: 'Almeida', texto: 'Onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles.' },
  { ref: 'Mateus 28:19', versao: 'Almeida', texto: 'Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo.' },
  { ref: 'Mateus 28:20', versao: 'Almeida', texto: 'Eis que eu estou convosco todos os dias, até a consumação dos séculos.' },
  { ref: 'Marcos 10:27', versao: 'Almeida', texto: 'Para os homens é impossível, mas não para Deus, porque para Deus tudo é possível.' },
  { ref: 'Marcos 11:24', versao: 'Almeida', texto: 'Tudo o que pedirdes orando, crede que o recebereis, e tê-lo-eis.' },
  { ref: 'Marcos 12:30', versao: 'Almeida', texto: 'Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma, de todo o teu entendimento e de todas as tuas forças.' },
  { ref: 'Lucas 1:37', versao: 'Almeida', texto: 'Porque para Deus nada é impossível.' },
  { ref: 'Lucas 6:31', versao: 'Almeida', texto: 'Como vós quereis que os homens vos façam, da mesma maneira lhes fazei também vós.' },
  { ref: 'Lucas 6:38', versao: 'Almeida', texto: 'Dai, e dar-se-vos-á; boa medida, recalcada, sacudida e transbordando vos deitarão no vosso regaço.' },
  { ref: 'Lucas 15:10', versao: 'Almeida', texto: 'Há alegria diante dos anjos de Deus por um pecador que se arrepende.' },
  { ref: 'João 1:1', versao: 'Almeida', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
  { ref: 'João 1:12', versao: 'Almeida', texto: 'A todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus.' },
  { ref: 'João 8:12', versao: 'Almeida', texto: 'Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.' },
  { ref: 'João 8:32', versao: 'Almeida', texto: 'E conhecereis a verdade, e a verdade vos libertará.' },
  { ref: 'João 10:10', versao: 'Almeida', texto: 'Eu vim para que tenham vida, e a tenham com abundância.' },
  { ref: 'João 11:25', versao: 'Almeida', texto: 'Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.' },
  { ref: 'João 13:34', versao: 'Almeida', texto: 'Um novo mandamento vos dou: que vos ameis uns aos outros, como eu vos amei a vós.' },
  { ref: 'João 14:1', versao: 'Almeida', texto: 'Não se turbe o vosso coração; credes em Deus, crede também em mim.' },
  { ref: 'João 14:6', versao: 'Almeida', texto: 'Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai, senão por mim.' },
  { ref: 'João 14:27', versao: 'Almeida', texto: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá.' },
  { ref: 'João 15:13', versao: 'Almeida', texto: 'Ninguém tem maior amor do que este: de dar alguém a sua vida pelos seus amigos.' },
  { ref: 'João 16:33', versao: 'Almeida', texto: 'No mundo tereis aflições, mas tende bom ânimo, eu venci o mundo.' },
  { ref: 'Atos 1:8', versao: 'Almeida', texto: 'Recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas.' },
  { ref: 'Atos 4:12', versao: 'Almeida', texto: 'Em nenhum outro há salvação, porque nenhum outro nome há, dado entre os homens, pelo qual devamos ser salvos.' },
  { ref: 'Atos 16:31', versao: 'Almeida', texto: 'Crê no Senhor Jesus Cristo, e serás salvo, tu e a tua casa.' },
  { ref: 'Romanos 1:16', versao: 'Almeida', texto: 'Não me envergonho do evangelho de Cristo, porque é o poder de Deus para salvação de todo aquele que crê.' },
  { ref: 'Romanos 5:8', versao: 'Almeida', texto: 'Deus prova o seu amor para conosco, em que Cristo morreu por nós, sendo nós ainda pecadores.' },
  { ref: 'Romanos 6:23', versao: 'Almeida', texto: 'O salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna.' },
  { ref: 'Romanos 10:9', versao: 'Almeida', texto: 'Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou, serás salvo.' },
  { ref: 'Romanos 12:1', versao: 'Almeida', texto: 'Apresentai os vossos corpos em sacrifício vivo, santo e agradável a Deus.' },
  { ref: 'Romanos 12:12', versao: 'Almeida', texto: 'Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.' },
  { ref: 'Romanos 15:13', versao: 'Almeida', texto: 'O Deus de esperança vos encha de todo o gozo e paz em crença, para que abundeis em esperança.' },
  { ref: '1 Coríntios 10:13', versao: 'Almeida', texto: 'Fiel é Deus, que vos não deixará tentar acima do que podeis.' },
  { ref: '1 Coríntios 15:58', versao: 'Almeida', texto: 'Meus amados irmãos, sede firmes e constantes, sempre abundantes na obra do Senhor.' },
  { ref: '2 Coríntios 5:17', versao: 'Almeida', texto: 'Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo.' },
  { ref: '2 Coríntios 9:7', versao: 'Almeida', texto: 'Cada um contribua segundo propôs no seu coração; porque Deus ama ao que dá com alegria.' },
  { ref: 'Gálatas 6:9', versao: 'Almeida', texto: 'Não nos cansemos de fazer o bem, pois a seu tempo colheremos, se não desfalecermos.' },
];
function reflexaoDoDia(d) {
  const epochDay = Math.floor(d.getTime() / 86400000);
  return REFLEXOES[epochDay % REFLEXOES.length];
}

// compartilhamento nativo (com fallback pra copiar o texto)
async function compartilhar(titulo, texto) {
  if (navigator.share) {
    try { await navigator.share({ title: titulo, text: texto }); return true; } catch { return false; }
  }
  try { await navigator.clipboard.writeText(texto); return 'copiado'; } catch { return false; }
}

// monta o link do Google Maps a partir de um endereço/local digitado
function linkMapa(endereco) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
}

/* ---------------------------------------------------------
   HELPERS DE DATA
--------------------------------------------------------- */
const pad = (n) => String(n).padStart(2, '0');
const dateId = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const monthId = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
function weekId(d) {
  const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (dt.getUTCDay() + 6) % 7;
  dt.setUTCDate(dt.getUTCDate() - dayNum + 3);
  const firstThu = new Date(Date.UTC(dt.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((dt - firstThu) / 86400000 - 3 + ((firstThu.getUTCDay() + 6) % 7)) / 7);
  return `${dt.getUTCFullYear()}-W${pad(week)}`;
}
const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
const diaAtual = (d) => DIAS[(d.getDay() + 6) % 7];
function contarSequencia(semana) {
  const hojeIdx = DIAS.indexOf(diaAtual(new Date()));
  let contagem = 0;
  for (let i = hojeIdx; i >= 0; i--) {
    if (semana[DIAS[i]]) contagem++; else break;
  }
  return contagem;
}
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DIAS_UTEIS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

// embaralhamento determinístico (mesma semente = mesma ordem) — assim todo
// mundo vê o mesmo quiz no mesmo dia, mas o conjunto muda bastante de um dia pro outro
function embaralharComSemente(lista, semente) {
  const arr = [...lista];
  let s = semente % 2147483647;
  if (s <= 0) s += 2147483646;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 48271) % 2147483647;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
// ordem embaralhada UMA ÚNICA VEZ (semente fixa) — o quiz percorre essa ordem
// em blocos de 5 por dia, então uma pergunta só volta a aparecer depois que
// todas as outras do banco já apareceram (em vez de sortear de novo todo dia,
// o que podia repetir a mesma pergunta depois de só 2 ou 3 dias por acaso).
const ORDEM_FIXA_BANCO = embaralharComSemente(BANCO, 777);
function quizDoDia(d) {
  const epochDay = Math.floor(d.getTime() / 86400000);
  const tamanho = ORDEM_FIXA_BANCO.length;
  const inicio = (epochDay * 5) % tamanho;
  const arr = [];
  for (let i = 0; i < 5; i++) arr.push(ORDEM_FIXA_BANCO[(inicio + i) % tamanho]);
  return arr;
}

// gera as semanas (apenas seg-sex) de um mês, para o calendário da escala
function gerarSemanas(ano, mes) {
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  const semanas = [];
  let atual = Array(5).fill(null);
  for (let dia = 1; dia <= ultimoDia; dia++) {
    const d = new Date(ano, mes, dia);
    const dow = d.getDay(); // 0=dom .. 6=sab
    if (dow === 0 || dow === 6) continue;
    atual[dow - 1] = d;
    if (dow === 5) { semanas.push(atual); atual = Array(5).fill(null); }
  }
  if (atual.some(Boolean)) semanas.push(atual);
  return semanas;
}

const DIAS_SEMANA_COMPLETA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
function gerarSemanasCompletas(ano, mes) {
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  const offsetInicial = (new Date(ano, mes, 1).getDay() + 6) % 7; // seg=0
  const semanas = [];
  let atual = Array(7).fill(null);
  let idx = offsetInicial;
  for (let dia = 1; dia <= ultimoDia; dia++) {
    atual[idx] = new Date(ano, mes, dia);
    idx++;
    if (idx === 7) { semanas.push(atual); atual = Array(7).fill(null); idx = 0; }
  }
  if (atual.some(Boolean)) semanas.push(atual);
  return semanas;
}

function gerarId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function souLiderDe(membros, meuNome) {
  const existeLider = membros.some((m) => m.lider);
  if (!existeLider) return true; // ninguém foi marcado como líder ainda — fica liberado pra todos
  return membros.some((m) => m.lider && m.nome.trim().toLowerCase() === (meuNome || '').trim().toLowerCase());
}

// redimensiona uma imagem antes de guardar (evita fotos gigantes no storage)
function redimensionarImagem(file) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const max = 240;
        let { width, height } = img;
        if (width > height) { if (width > max) { height = Math.round(height * (max / width)); width = max; } }
        else { if (height > max) { width = Math.round(width * (max / height)); height = max; } }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.78));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    leitor.onerror = reject;
    leitor.readAsDataURL(file);
  });
}

const DURACAO_MAX_AUDIO = 120; // segundos
const JANELA_PRESENCA_MS = 3 * 60 * 1000; // considera "online" quem teve heartbeat nos últimos 3 min

/* ---------------------------------------------------------
   TOKENS VISUAIS
--------------------------------------------------------- */
const TEMA_ESCURO = {
  bg: '#161B33', painel: '#212852', painelAlt: '#2A3363',
  borda: 'rgba(245,239,224,0.09)', navBg: '#1C2244', mudoSuave: 'rgba(245,239,224,0.25)',
  ouro: '#E3B23C', ouroSuave: '#F0C868',
  texto: '#F5EFE0', mudo: '#9AA3C7', sucesso: '#6FA287', erro: '#C1666B',
};
const TEMA_CLARO = {
  bg: '#FBF8F1', painel: '#FFFFFF', painelAlt: '#F1EAD9',
  borda: 'rgba(43,27,18,0.10)', navBg: '#FFFFFF', mudoSuave: 'rgba(43,27,18,0.20)',
  ouro: '#C6821F', ouroSuave: '#E3B23C',
  texto: '#2B2013', mudo: '#6B5D48', sucesso: '#2E7259', erro: '#B4534B',
};
// objeto mutável: trocar de tema reatribui os valores e um novo render (disparado
// pela troca do state `tema` no App) já lê os valores atualizados em todo o app.
let cor = { ...TEMA_ESCURO };
function aplicarTema(nome) {
  Object.assign(cor, nome === 'claro' ? TEMA_CLARO : TEMA_ESCURO);
}

const fontes = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
body { margin: 0; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: rgba(245,239,224,0.15); border-radius: 4px; }
.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }
.orbita-gira { animation: orbita-girar 50s linear infinite; }
@keyframes orbita-girar { to { transform: rotate(360deg); } }
.orbita-contragira { animation: orbita-contragirar 50s linear infinite; }
@keyframes orbita-contragirar { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@keyframes pulsar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: 0.85; } }
.logo-pulsa { animation: pulsar 1.8s ease-in-out infinite; }
@keyframes confete-cair { 0% { transform: translateY(-10px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(600deg); opacity: 0; } }
@keyframes orbita-surgir { from { opacity: 0; } to { opacity: 1; } }
.orbita-fade { animation: orbita-girar 50s linear infinite, orbita-surgir 0.6s ease; }
`;

/* ---------------------------------------------------------
   AVATAR (foto ou iniciais)
--------------------------------------------------------- */
function iniciais(nome) {
  return nome.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() || '').join('');
}
function Avatar({ nome, foto, tamanho = 40 }) {
  if (foto) {
    return <img src={foto} alt={nome} style={{ width: tamanho, height: tamanho, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `1px solid ${cor.borda}` }} />;
  }
  return (
    <div style={{
      width: tamanho, height: tamanho, borderRadius: '50%', background: cor.painelAlt, border: `1px solid ${cor.borda}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      fontFamily: 'Fraunces', fontWeight: 600, fontSize: tamanho * 0.36, color: cor.ouro,
    }}>
      {iniciais(nome)}
    </div>
  );
}

function Emblema({ emoji, texto }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, padding: '6px 11px', borderRadius: 999,
      border: `1px solid ${cor.ouro}`, background: 'rgba(227,178,60,0.10)',
      fontFamily: 'Inter', fontSize: 12, fontWeight: 700, color: cor.ouro,
    }}>
      <span>{emoji}</span>{texto}
    </div>
  );
}

function Confete() {
  const CORES = [cor.ouro, cor.ouroSuave, cor.sucesso, '#8AA6D6', '#C48FE0'];
  const pecas = React.useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    esquerda: Math.random() * 100,
    atraso: Math.random() * 0.4,
    duracao: 1.6 + Math.random() * 1,
    cor: CORES[i % CORES.length],
    rotacao: Math.random() * 360,
    largura: 6 + Math.random() * 6,
  })), []);
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 70 }}>
      {pecas.map((p) => (
        <span key={p.id} style={{
          position: 'absolute', top: -20, left: `${p.esquerda}%`, width: p.largura, height: p.largura * 0.4,
          background: p.cor, opacity: 0.9, transform: `rotate(${p.rotacao}deg)`,
          animation: `confete-cair ${p.duracao}s ease-in ${p.atraso}s forwards`,
        }} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   COMPONENTE: TRILHA DE LUZ
--------------------------------------------------------- */
function TrilhaDeLuz({ semana }) {
  const hoje = diaAtual(new Date());
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 4px 6px' }}>
      {DIAS.map((d) => {
        const aceso = semana[d];
        const ehHoje = d === hoje;
        return (
          <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: aceso ? `radial-gradient(circle, ${cor.ouroSuave}, ${cor.ouro})` : 'transparent',
              border: aceso ? 'none' : `1.5px solid ${ehHoje ? cor.ouro : cor.mudoSuave}`,
              boxShadow: aceso ? '0 0 14px rgba(227,178,60,0.55)' : 'none',
              transition: 'all .25s ease',
            }}>
              <Flame size={14} strokeWidth={2.3} color={aceso ? '#161B33' : ehHoje ? cor.ouro : cor.mudoSuave} fill={aceso ? '#161B33' : 'none'} />
            </div>
            <span style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 0.5, color: ehHoje ? cor.ouro : cor.mudo, textTransform: 'uppercase' }}>{d}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------
   TELA: ENTRAR COM O NOME
--------------------------------------------------------- */
const POSICOES_ORBITA = [
  { angulo: -55, raio: 88, tamanho: 46 },
  { angulo: 20, raio: 118, tamanho: 56 },
  { angulo: 100, raio: 92, tamanho: 44 },
  { angulo: 175, raio: 120, tamanho: 52 },
  { angulo: 245, raio: 68, tamanho: 40 },
];

function OrbitaMembros({ membros, onSelecionar }) {
  const tamanhoPagina = POSICOES_ORBITA.length;
  const totalPaginas = Math.max(1, Math.ceil(membros.length / tamanhoPagina));
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    setPagina(0);
    if (totalPaginas <= 1) return;
    const intervalo = setInterval(() => {
      setPagina((p) => (p + 1) % totalPaginas);
    }, 4500);
    return () => clearInterval(intervalo);
  }, [totalPaginas]);

  const exibidos = membros.slice(pagina * tamanhoPagina, pagina * tamanhoPagina + tamanhoPagina);

  return (
    <div style={{ position: 'relative', width: 260, height: 260, marginBottom: 8 }}>
      {/* anéis pontilhados da órbita */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 236, height: 236, transform: 'translate(-50%, -50%)', borderRadius: '50%', border: `1px dashed ${cor.mudoSuave}` }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 168, height: 168, transform: 'translate(-50%, -50%)', borderRadius: '50%', border: `1px dashed ${cor.mudoSuave}` }} />

      {/* logo central */}
      <div className="logo-pulsa" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 64, height: 64, borderRadius: 18, background: `radial-gradient(circle, ${cor.ouroSuave}, ${cor.ouro})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 28px rgba(227,178,60,0.45)', zIndex: 2,
      }}>
        <Flame size={28} color="#161B33" fill="#161B33" />
      </div>

      {/* camada que gira — as fotos ficam paradas (contragiram) dentro dela */}
      <div key={pagina} className="orbita-fade" style={{ position: 'absolute', inset: 0 }}>
        {exibidos.map((m, i) => {
          const { angulo, raio, tamanho } = POSICOES_ORBITA[i];
          const rad = (angulo * Math.PI) / 180;
          const x = Math.cos(rad) * raio;
          const y = Math.sin(rad) * raio;
          return (
            <div key={m.id} style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, zIndex: 2 }}>
              <button onClick={() => onSelecionar(m.nome)} className="orbita-contragira" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}>
                <Avatar nome={m.nome} foto={m.foto} tamanho={tamanho} />
              </button>
            </div>
          );
        })}
      </div>

      {totalPaginas > 1 && (
        <div style={{ position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i === pagina ? cor.ouro : cor.mudoSuave }} />
          ))}
        </div>
      )}
    </div>
  );
}

function TelaNome({ onEntrar, membros, onCadastrarMembro }) {
  const [valor, setValor] = useState('');
  const [senha, setSenha] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [modo, setModo] = useState('entrar'); // 'entrar' | 'cadastrar'
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState('');

  const trocarModo = (novoModo) => {
    setModo(novoModo);
    setErro('');
    setSenha('');
  };

  const confirmar = async () => {
    const nomeLimpo = valor.trim();
    if (!nomeLimpo) return;
    if (!senha.trim()) { setErro('Digite uma senha.'); return; }
    setErro('');
    setProcessando(true);
    const chave = `conta:${nomeLimpo.toLowerCase()}`;
    try {
      let contaExistente = null;
      try {
        const r = await window.storage.get(chave, true);
        contaExistente = JSON.parse(r.value);
      } catch { /* ainda não existe conta com esse nome */ }

      if (modo === 'cadastrar') {
        if (contaExistente) {
          setErro('Já existe uma conta com esse nome. Toque em "Já tenho login".');
          setProcessando(false);
          return;
        }
        await window.storage.set(chave, JSON.stringify({ senha }), true);
        const jaEhMembro = membros.some((m) => m.nome.trim().toLowerCase() === nomeLimpo.toLowerCase());
        if (!jaEhMembro && onCadastrarMembro) {
          await onCadastrarMembro(nomeLimpo, aniversario.trim());
        }
        onEntrar(nomeLimpo);
      } else {
        if (!contaExistente) {
          setErro('Não achei conta com esse nome. Toque em "Cadastrar" pra criar uma.');
          setProcessando(false);
          return;
        }
        if (contaExistente.senha !== senha) {
          setErro('Senha incorreta.');
          setProcessando(false);
          return;
        }
        onEntrar(nomeLimpo);
      }
    } catch {
      setErro('Não foi possível continuar agora. Tenta de novo.');
      setProcessando(false);
    }
  };

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '26px 28px 18px', textAlign: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <OrbitaMembros membros={membros} onSelecionar={setValor} />

        <h1 style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 28, color: cor.texto, margin: '4px 0 10px' }}>Lâmpada</h1>

        <p style={{ fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 13.5, color: cor.mudo, lineHeight: 1.5, margin: '0 0 20px', maxWidth: 260 }}>
          &ldquo;Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.&rdquo;
          <br />
          <span style={{ fontFamily: 'Inter', fontStyle: 'normal', fontSize: 11 }}>Salmos 119:105 · NAA</span>
        </p>

        <div style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 280, marginBottom: 14 }}>
          <button
            onClick={() => trocarModo('entrar')}
            style={{ flex: 1, padding: '9px 0', borderRadius: 999, border: `1.5px solid ${modo === 'entrar' ? cor.ouro : cor.borda}`, background: modo === 'entrar' ? 'rgba(227,178,60,0.10)' : 'transparent', color: cor.texto, fontFamily: 'Inter', fontWeight: 600, fontSize: 12.5, cursor: 'pointer' }}
          >
            Já tenho login
          </button>
          <button
            onClick={() => trocarModo('cadastrar')}
            style={{ flex: 1, padding: '9px 0', borderRadius: 999, border: `1.5px solid ${modo === 'cadastrar' ? cor.ouro : cor.borda}`, background: modo === 'cadastrar' ? 'rgba(227,178,60,0.10)' : 'transparent', color: cor.texto, fontFamily: 'Inter', fontWeight: 600, fontSize: 12.5, cursor: 'pointer' }}
          >
            Cadastrar
          </button>
        </div>

        <input
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Seu nome"
          style={{
            width: '100%', maxWidth: 280, padding: '13px 16px', borderRadius: 12,
            border: `1px solid ${cor.borda}`, background: cor.painel, color: cor.texto,
            fontFamily: 'Inter', fontSize: 15, outline: 'none', marginBottom: 10,
          }}
        />
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && confirmar()}
          type="password"
          placeholder={modo === 'cadastrar' ? 'Crie uma senha' : 'Sua senha'}
          style={{
            width: '100%', maxWidth: 280, padding: '13px 16px', borderRadius: 12,
            border: `1px solid ${cor.borda}`, background: cor.painel, color: cor.texto,
            fontFamily: 'Inter', fontSize: 15, outline: 'none', marginBottom: modo === 'cadastrar' ? 10 : 14,
          }}
        />

        {modo === 'cadastrar' && (
          <input
            value={aniversario}
            onChange={(e) => setAniversario(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && confirmar()}
            placeholder="Seu aniversário — DD/MM (opcional)"
            style={{
              width: '100%', maxWidth: 280, padding: '13px 16px', borderRadius: 12,
              border: `1px solid ${cor.borda}`, background: cor.painel, color: cor.texto,
              fontFamily: 'Inter', fontSize: 15, outline: 'none', marginBottom: 14,
            }}
          />
        )}

        {erro && <p style={{ color: cor.erro, fontFamily: 'Inter', fontSize: 12.5, margin: '-6px 0 14px', maxWidth: 280 }}>{erro}</p>}

        <button
          onClick={confirmar}
          disabled={!valor.trim() || !senha.trim() || processando}
          style={{
            width: '100%', maxWidth: 280, padding: '13px 16px', borderRadius: 12, border: 'none',
            background: valor.trim() && senha.trim() ? cor.ouro : cor.mudoSuave, color: valor.trim() && senha.trim() ? '#161B33' : cor.mudo,
            fontFamily: 'Inter', fontWeight: 700, fontSize: 15, cursor: valor.trim() && senha.trim() ? 'pointer' : 'default',
          }}
        >
          {processando ? 'Só um instante…' : modo === 'cadastrar' ? 'Criar conta' : 'Entrar'}
        </button>
      </div>

      <p style={{ fontFamily: 'Inter', fontSize: 12, color: cor.mudo, margin: '18px 0 0', lineHeight: 1.5 }}>
        App criado para os jovens da Igreja de Nova Vida do Rio Comprido
      </p>
    </div>
  );
}

/* ---------------------------------------------------------
   ABA: QUIZ
--------------------------------------------------------- */
function AbaQuiz({ nome }) {
  const hoje = new Date();
  const did = dateId(hoje);
  const wid = weekId(hoje);
  const mid = monthId(hoje);
  const perguntas = quizDoDia(hoje);

  const [carregando, setCarregando] = useState(true);
  const [respostasHoje, setRespostasHoje] = useState(null);
  const [selecoes, setSelecoes] = useState(Array(perguntas.length).fill(null));
  const [enviando, setEnviando] = useState(false);
  const [semana, setSemana] = useState({});
  const [erro, setErro] = useState('');
  const [mostrarConfete, setMostrarConfete] = useState(false);
  const [avisoDestaque, setAvisoDestaque] = useState(null);

  useEffect(() => {
    (async () => {
      setCarregando(true);
      const [rRespostas, rSemana, rAvisos] = await Promise.allSettled([
        window.storage.get(`respostas:${did}`, true),
        window.storage.get(`semana:${wid}`, true),
        window.storage.get(`avisos:${mid}`, true),
      ]);
      if (rRespostas.status === 'fulfilled' && rRespostas.value) {
        const todas = JSON.parse(rRespostas.value.value);
        if (todas[nome]) setRespostasHoje(todas[nome]);
      }
      if (rSemana.status === 'fulfilled' && rSemana.value) {
        const dados = JSON.parse(rSemana.value.value);
        setSemana(dados.trilha?.[nome] || {});
      }
      if (rAvisos.status === 'fulfilled' && rAvisos.value) {
        const eventos = JSON.parse(rAvisos.value.value);
        const proximos = Object.entries(eventos)
          .filter(([dId]) => dId >= did)
          .flatMap(([dId, lista]) => lista.filter((e) => e.destaque).map((e) => ({ ...e, data: dId })))
          .sort((a, b) => a.data.localeCompare(b.data));
        setAvisoDestaque(proximos[0] || null);
      }
      setCarregando(false);
    })();
  }, [nome, did, wid, mid]);

  const escolher = (i, opcao) => {
    if (respostasHoje) return;
    const novas = [...selecoes];
    novas[i] = opcao;
    setSelecoes(novas);
  };

  const enviar = async () => {
    if (selecoes.some((s) => s === null)) { setErro('Responda todas as perguntas antes de enviar.'); return; }
    setErro('');
    setEnviando(true);
    try {
      const acertos = selecoes.filter((s, i) => s === perguntas[i].c).length;
      const registro = { score: acertos, total: perguntas.length, ts: Date.now() };
      const mid = monthId(hoje);

      const [rRespostas, rSemana, rMes] = await Promise.allSettled([
        window.storage.get(`respostas:${did}`, true),
        window.storage.get(`semana:${wid}`, true),
        window.storage.get(`mes:${mid}`, true),
      ]);

      const todas = rRespostas.status === 'fulfilled' && rRespostas.value ? JSON.parse(rRespostas.value.value) : {};
      todas[nome] = registro;

      const dadosSemana = rSemana.status === 'fulfilled' && rSemana.value ? JSON.parse(rSemana.value.value) : { pontos: {}, trilha: {} };
      dadosSemana.pontos[nome] = (dadosSemana.pontos[nome] || 0) + acertos;
      dadosSemana.trilha[nome] = { ...(dadosSemana.trilha[nome] || {}), [diaAtual(hoje)]: true };

      const rankMes = rMes.status === 'fulfilled' && rMes.value ? JSON.parse(rMes.value.value) : {};
      rankMes[nome] = (rankMes[nome] || 0) + acertos;

      await Promise.all([
        window.storage.set(`respostas:${did}`, JSON.stringify(todas), true),
        window.storage.set(`semana:${wid}`, JSON.stringify(dadosSemana), true),
        window.storage.set(`mes:${mid}`, JSON.stringify(rankMes), true),
      ]);

      setSemana(dadosSemana.trilha[nome]);
      setRespostasHoje(registro);
      if (acertos === perguntas.length) {
        setMostrarConfete(true);
        setTimeout(() => setMostrarConfete(false), 2600);
      }
    } catch (e) {
      setErro('Não foi possível enviar agora. Tenta de novo em instantes.');
    } finally {
      setEnviando(false);
    }
  };

  if (carregando) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Loader2 className="spin" size={22} color={cor.ouro} /></div>;
  }

  const sequenciaAtual = contarSequencia(semana);
  const semanaCompleta = DIAS.every((d) => semana[d]);
  const gabaritoHoje = !!respostasHoje && respostasHoje.score === respostasHoje.total;
  const temEmblema = sequenciaAtual > 0 || semanaCompleta || gabaritoHoje;

  const reflexao = reflexaoDoDia(hoje);

  return (
    <div style={{ padding: '4px 18px 100px' }}>
      {avisoDestaque && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, background: `linear-gradient(135deg, rgba(227,178,60,0.16), rgba(240,200,104,0.08))`,
          border: `1.5px solid ${cor.ouro}`, borderRadius: 14, padding: '12px 14px', marginBottom: 12,
        }}>
          <Megaphone size={16} color={cor.ouro} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: cor.texto }}>{avisoDestaque.titulo}</div>
            <div style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo, marginTop: 1 }}>
              {formatarDataCurta(avisoDestaque.data)}{avisoDestaque.horario ? ` · ${avisoDestaque.horario}` : ''}{avisoDestaque.local ? ` · ${avisoDestaque.local}` : ''}{avisoDestaque.endereco ? ` · ${avisoDestaque.endereco}` : ''}
            </div>
          </div>
        </div>
      )}
      {mostrarConfete && <Confete />}
      {mostrarConfete && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, background: `linear-gradient(135deg, rgba(227,178,60,0.18), rgba(240,200,104,0.10))`,
          border: `1.5px solid ${cor.ouro}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10,
        }}>
          <span style={{ fontSize: 22 }}>🎉</span>
          <div>
            <div style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 15, color: cor.texto }}>Pontuação perfeita!</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 13, color: cor.ouro }}>{respostasHoje.score}/{respostasHoje.total} acertos</div>
          </div>
        </div>
      )}
      <div style={{ background: cor.painelAlt, border: `1px solid ${cor.borda}`, borderRadius: 14, padding: '14px 16px', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Sparkles size={13} color={cor.ouro} />
          <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: cor.ouro, textTransform: 'uppercase', letterSpacing: 0.4 }}>Versículo do dia</span>
        </div>
        <p style={{ fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 14.5, color: cor.texto, lineHeight: 1.55, margin: '0 0 6px' }}>&ldquo;{reflexao.texto}&rdquo;</p>
        <p style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo, margin: 0 }}>{reflexao.ref} · {reflexao.versao}</p>
      </div>
      <TrilhaDeLuz semana={semana} />
      {temEmblema && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '2px 0 14px' }}>
          {semanaCompleta && <Emblema emoji="🏆" texto="Semana completa" />}
          {gabaritoHoje && <Emblema emoji="🎯" texto="Gabarito de hoje" />}
          {sequenciaAtual > 0 && <Emblema emoji="🔥" texto={`${sequenciaAtual} ${sequenciaAtual === 1 ? 'dia seguido' : 'dias seguidos'}`} />}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '10px 0 4px' }}>
        <h2 style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 21, color: cor.texto, margin: 0 }}>Quiz de hoje</h2>
        {respostasHoje && (
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: cor.ouro, fontWeight: 700 }}>{respostasHoje.score}/{respostasHoje.total}</span>
        )}
      </div>
      <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo, margin: '0 0 18px' }}>
        {respostasHoje ? 'Resultado de hoje — volta amanhã para o próximo.' : `${perguntas.length} perguntas · vale ${perguntas.length} pontos`}
      </p>

      {perguntas.map((q, i) => {
        const opcoes = q.t === 'v' ? ['Verdadeiro', 'Falso'] : q.o;
        return (
          <div key={i} style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: cor.texto, fontWeight: 600, margin: '0 0 12px', lineHeight: 1.4 }}>{q.p}</p>
            <div style={{ display: 'flex', flexDirection: q.t === 'v' ? 'row' : 'column', gap: 8 }}>
              {opcoes.map((op, j) => {
                const selecionada = respostasHoje ? j === q.c : selecoes[i] === j;
                const mostrarCerta = !!respostasHoje && j === q.c;
                const mostrarErrada = !!respostasHoje && selecoes[i] === j && j !== q.c;
                return (
                  <button
                    key={j}
                    onClick={() => escolher(i, j)}
                    disabled={!!respostasHoje}
                    style={{
                      flex: q.t === 'v' ? 1 : 'unset',
                      textAlign: 'left', padding: '11px 13px', borderRadius: 10,
                      border: `1.5px solid ${mostrarCerta ? cor.sucesso : mostrarErrada ? cor.erro : selecionada ? cor.ouro : cor.borda}`,
                      background: mostrarCerta ? 'rgba(111,162,135,0.14)' : mostrarErrada ? 'rgba(193,102,107,0.14)' : selecionada ? 'rgba(227,178,60,0.10)' : 'transparent',
                      color: cor.texto, fontFamily: 'Inter', fontSize: 13.5, cursor: respostasHoje ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                    }}
                  >
                    {op}
                    {mostrarCerta && <Check size={15} color={cor.sucesso} />}
                    {mostrarErrada && <X size={15} color={cor.erro} />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {erro && <p style={{ color: cor.erro, fontFamily: 'Inter', fontSize: 13, margin: '6px 0 12px' }}>{erro}</p>}

      {respostasHoje ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', padding: '14px 0 6px', color: cor.mudo, fontFamily: 'Inter', fontSize: 13 }}>
            <Lock size={14} /> Resultado travado até amanhã
          </div>
          <button
            onClick={() => compartilhar('Quiz Lâmpada', `Acertei ${respostasHoje.score}/${respostasHoje.total} no quiz da Lâmpada hoje! 🔥`)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', borderRadius: 12, border: `1.5px solid ${cor.borda}`, background: 'transparent', color: cor.texto, fontFamily: 'Inter', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}
          >
            <Share2 size={14} /> Compartilhar resultado
          </button>
        </>
      ) : (
        <button
          onClick={enviar}
          disabled={enviando}
          style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: cor.ouro, color: '#161B33', fontFamily: 'Inter', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginTop: 4 }}
        >
          {enviando ? 'Enviando…' : 'Enviar respostas'}
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   ABA: ESCALA (calendário, apenas dias úteis)
--------------------------------------------------------- */
function AbaEscala({ membros, meuNome }) {
  const agora = new Date();
  const [ano, setAno] = useState(agora.getFullYear());
  const [mes, setMes] = useState(agora.getMonth());
  const [dados, setDados] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const mid = `${ano}-${pad(mes + 1)}`;
  const semanas = gerarSemanas(ano, mes);
  const hojeId = dateId(agora);
  const existeLider = membros.some((m) => m.lider);
  const souLider = souLiderDe(membros, meuNome);

  useEffect(() => {
    (async () => {
      setCarregando(true);
      try {
        const r = await window.storage.get(`escala:${mid}`, true);
        setDados(r ? JSON.parse(r.value) : {});
      } catch { setDados({}); }
      setCarregando(false);
      setDiaSelecionado(null);
    })();
  }, [mid]);

  const mudarMes = (delta) => {
    let m = mes + delta, a = ano;
    if (m < 0) { m = 11; a -= 1; }
    if (m > 11) { m = 0; a += 1; }
    setMes(m); setAno(a);
  };

  const atribuir = async (membro) => {
    if (!diaSelecionado) return;
    const dId = dateId(diaSelecionado);
    const novo = { ...dados, [dId]: { membroId: membro.id, nome: membro.nome } };
    setDados(novo);
    setDiaSelecionado(null);
    try { await window.storage.set(`escala:${mid}`, JSON.stringify(novo), true); } catch { /* tenta depois */ }
  };

  const limpar = async () => {
    if (!diaSelecionado) return;
    const dId = dateId(diaSelecionado);
    const novo = { ...dados };
    delete novo[dId];
    setDados(novo);
    setDiaSelecionado(null);
    try { await window.storage.set(`escala:${mid}`, JSON.stringify(novo), true); } catch { /* tenta depois */ }
  };

  return (
    <div style={{ padding: '4px 18px 100px' }}>
      <h2 style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 21, color: cor.texto, margin: '14px 0 4px' }}>Escala do devocional</h2>
      <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo, margin: '0 0 16px' }}>
        {souLider ? 'Toque num dia útil para escalar quem vai trazer a palavra.' : 'Apenas líderes podem editar a escala.'}
      </p>

      <div style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 16, padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button onClick={() => mudarMes(-1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
            <ChevronLeft size={18} color={cor.mudo} />
          </button>
          <span style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 15, color: cor.texto }}>{MESES[mes]} {ano}</span>
          <button onClick={() => mudarMes(1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
            <ChevronRight size={18} color={cor.mudo} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginBottom: 6 }}>
          {DIAS_UTEIS.map((d) => (
            <div key={d} style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 10.5, fontWeight: 700, color: cor.mudo, textTransform: 'uppercase' }}>{d}</div>
          ))}
        </div>

        {carregando ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Loader2 className="spin" size={20} color={cor.ouro} /></div>
        ) : (
          semanas.map((semana, si) => (
            <div key={si} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginBottom: 4 }}>
              {semana.map((d, di) => {
                if (!d) return <div key={di} />;
                const dId = dateId(d);
                const atrib = dados[dId];
                const ehHoje = dId === hojeId;
                return (
                  <button
                    key={di}
                    onClick={() => souLider && setDiaSelecionado(d)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 3,
                      background: ehHoje ? 'rgba(227,178,60,0.10)' : 'transparent',
                      border: `1px solid ${ehHoje ? cor.ouro : cor.borda}`, borderRadius: 10, padding: '6px 2px', minHeight: 62,
                      cursor: souLider ? 'pointer' : 'default', opacity: souLider ? 1 : 0.75,
                    }}
                  >
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: ehHoje ? cor.ouro : cor.mudo, fontWeight: 700 }}>{d.getDate()}</span>
                    {atrib ? (
                      <Avatar nome={atrib.nome} foto={membros.find((m) => m.id === atrib.membroId)?.foto} tamanho={22} />
                    ) : (
                      <Plus size={13} color={cor.mudoSuave} />
                    )}
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>

      {diaSelecionado && (
        <div style={{ background: cor.painel, border: `1px solid ${cor.ouro}`, borderRadius: 16, padding: 16, marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13.5, color: cor.texto }}>
              Quem vai trazer dia {diaSelecionado.getDate()}/{pad(mes + 1)}?
            </span>
            <button onClick={() => setDiaSelecionado(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <X size={16} color={cor.mudo} />
            </button>
          </div>
          {dados[dateId(diaSelecionado)] && (
            <button onClick={limpar} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(193,102,107,0.12)', border: 'none', borderRadius: 8, padding: '7px 10px', marginBottom: 12, cursor: 'pointer', color: cor.erro, fontFamily: 'Inter', fontSize: 12.5, fontWeight: 600 }}>
              <Trash2 size={13} /> Remover escala deste dia
            </button>
          )}
          {membros.length === 0 ? (
            <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo }}>Cadastre membros na aba "Membros" primeiro.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {membros.map((m) => (
                <button key={m.id} onClick={() => atribuir(m)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 58 }}>
                  <Avatar nome={m.nome} foto={m.foto} tamanho={44} />
                  <span style={{ fontFamily: 'Inter', fontSize: 10, color: cor.mudo, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 58 }}>{m.nome.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   ABA: AVISOS E EVENTOS (calendário completo, cultos/avisos)
--------------------------------------------------------- */
function AbaAvisos({ membros, meuNome }) {
  const agora = new Date();
  const [ano, setAno] = useState(agora.getFullYear());
  const [mes, setMes] = useState(agora.getMonth());
  const [dados, setDados] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [horario, setHorario] = useState('');
  const [local, setLocal] = useState('');
  const [endereco, setEndereco] = useState('');
  const [obs, setObs] = useState('');
  const [destaqueMarcado, setDestaqueMarcado] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [verConfirmados, setVerConfirmados] = useState(null);

  const souLider = souLiderDe(membros, meuNome);
  const mid = `${ano}-${pad(mes + 1)}`;
  const semanas = gerarSemanasCompletas(ano, mes);
  const hojeId = dateId(agora);

  useEffect(() => {
    (async () => {
      setCarregando(true);
      try {
        const r = await window.storage.get(`avisos:${mid}`, true);
        setDados(r ? JSON.parse(r.value) : {});
      } catch { setDados({}); }
      setCarregando(false);
      setDiaSelecionado(null);
      setEditandoId(null);
      setTitulo(''); setHorario(''); setLocal(''); setEndereco(''); setObs(''); setDestaqueMarcado(false);
    })();
  }, [mid]);

  const mudarMes = (delta) => {
    let m = mes + delta, a = ano;
    if (m < 0) { m = 11; a -= 1; }
    if (m > 11) { m = 0; a += 1; }
    setMes(m); setAno(a);
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setTitulo(''); setHorario(''); setLocal(''); setEndereco(''); setObs(''); setDestaqueMarcado(false);
  };

  const selecionarDia = (d) => {
    setDiaSelecionado(d);
    limparFormulario();
  };

  const editarAviso = (evento) => {
    setEditandoId(evento.id);
    setTitulo(evento.titulo);
    setHorario(evento.horario || '');
    setLocal(evento.local || '');
    setEndereco(evento.endereco || '');
    setObs(evento.obs || '');
    setDestaqueMarcado(!!evento.destaque);
  };

  const salvar = async () => {
    if (!diaSelecionado || !titulo.trim()) return;
    setSalvando(true);
    const dId = dateId(diaSelecionado);
    let novo;
    if (editandoId) {
      novo = {
        ...dados,
        [dId]: (dados[dId] || []).map((e) => (
          e.id === editandoId
            ? { ...e, titulo: titulo.trim(), horario: horario.trim(), local: local.trim(), endereco: endereco.trim(), obs: obs.trim(), destaque: destaqueMarcado }
            : e
        )),
      };
    } else {
      const novoEvento = { id: gerarId(), titulo: titulo.trim(), horario: horario.trim(), local: local.trim(), endereco: endereco.trim(), obs: obs.trim(), destaque: destaqueMarcado, confirmacoes: {} };
      novo = { ...dados, [dId]: [...(dados[dId] || []), novoEvento] };
    }
    setDados(novo);
    limparFormulario();
    try { await window.storage.set(`avisos:${mid}`, JSON.stringify(novo), true); } catch { /* tenta depois */ }
    setSalvando(false);
  };

  const remover = async (dId, eventoId) => {
    const restantes = (dados[dId] || []).filter((e) => e.id !== eventoId);
    const novo = { ...dados };
    if (restantes.length > 0) novo[dId] = restantes; else delete novo[dId];
    setDados(novo);
    if (editandoId === eventoId) limparFormulario();
    try { await window.storage.set(`avisos:${mid}`, JSON.stringify(novo), true); } catch { /* tenta depois */ }
  };

  const alternarDestaque = async (dId, eventoId) => {
    const atualizada = (dados[dId] || []).map((e) => (e.id === eventoId ? { ...e, destaque: !e.destaque } : e));
    const novo = { ...dados, [dId]: atualizada };
    setDados(novo);
    try { await window.storage.set(`avisos:${mid}`, JSON.stringify(novo), true); } catch { /* tenta depois */ }
  };

  const confirmarPresenca = async (dId, eventoId, status) => {
    if (!meuNome) return;
    const atualizada = (dados[dId] || []).map((e) => {
      if (e.id !== eventoId) return e;
      const confirmacoes = { ...(e.confirmacoes || {}) };
      if (confirmacoes[meuNome] === status) delete confirmacoes[meuNome];
      else confirmacoes[meuNome] = status;
      return { ...e, confirmacoes };
    });
    const novo = { ...dados, [dId]: atualizada };
    setDados(novo);
    try { await window.storage.set(`avisos:${mid}`, JSON.stringify(novo), true); } catch { /* tenta depois */ }
  };

  const agenda = Object.entries(dados)
    .flatMap(([dId, eventos]) => eventos.map((e) => ({ ...e, data: dId })))
    .sort((a, b) => a.data.localeCompare(b.data) || (a.horario || '').localeCompare(b.horario || ''));

  const DIAS_NOME_COMPLETO = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const exportarAgenda = () => {
    if (agenda.length === 0) return;
    let texto = `📅 Agenda de ${MESES[mes]} — Lâmpada\n\n`;
    agenda.forEach((e) => {
      const [a, m, d] = e.data.split('-').map(Number);
      const diaSemana = DIAS_NOME_COMPLETO[new Date(a, m - 1, d).getDay()];
      texto += `${pad(d)}/${pad(m)} (${diaSemana})\n${e.titulo}${e.horario ? ` · ${e.horario}` : ''}\n`;
      if (e.local) texto += `Local: ${e.local}\n`;
      if (e.endereco) texto += `📍 ${e.endereco}\n`;
      if (e.obs) texto += `OBS: ${e.obs}\n`;
      texto += '\n';
    });
    compartilhar(`Agenda de ${MESES[mes]}`, texto.trim());
  };

  const eventosDoDiaSelecionado = diaSelecionado ? (dados[dateId(diaSelecionado)] || []) : [];

  return (
    <div style={{ padding: '4px 18px 100px' }}>
      <h2 style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 21, color: cor.texto, margin: '14px 0 4px' }}>Avisos e eventos</h2>
      <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo, margin: '0 0 16px' }}>
        {souLider ? 'Toque num dia pra marcar um culto, evento ou aviso.' : 'Confira os próximos cultos e eventos do grupo.'}
      </p>

      <div style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 16, padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button onClick={() => mudarMes(-1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
            <ChevronLeft size={18} color={cor.mudo} />
          </button>
          <span style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 15, color: cor.texto }}>{MESES[mes]} {ano}</span>
          <button onClick={() => mudarMes(1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
            <ChevronRight size={18} color={cor.mudo} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 6 }}>
          {DIAS_SEMANA_COMPLETA.map((d) => (
            <div key={d} style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 9.5, fontWeight: 700, color: cor.mudo, textTransform: 'uppercase' }}>{d}</div>
          ))}
        </div>

        {carregando ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Loader2 className="spin" size={20} color={cor.ouro} /></div>
        ) : (
          semanas.map((semana, si) => (
            <div key={si} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 3 }}>
              {semana.map((d, di) => {
                if (!d) return <div key={di} />;
                const dId = dateId(d);
                const eventos = dados[dId] || [];
                const ehHoje = dId === hojeId;
                const ehSelecionado = diaSelecionado && dateId(diaSelecionado) === dId;
                return (
                  <button
                    key={di}
                    onClick={() => selecionarDia(d)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 3,
                      background: ehSelecionado ? 'rgba(227,178,60,0.16)' : ehHoje ? 'rgba(227,178,60,0.08)' : 'transparent',
                      border: `1px solid ${ehSelecionado ? cor.ouro : ehHoje ? cor.ouro : cor.borda}`, borderRadius: 9, padding: '5px 1px', minHeight: 40,
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10.5, color: ehHoje || ehSelecionado ? cor.ouro : cor.mudo, fontWeight: 700 }}>{d.getDate()}</span>
                    {eventos.length > 0 && (
                      <div style={{ display: 'flex', gap: 2 }}>
                        {eventos.slice(0, 3).map((_, i) => (
                          <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: cor.ouro }} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>

      {diaSelecionado && (
        <div style={{ background: cor.painel, border: `1px solid ${cor.ouro}`, borderRadius: 16, padding: 16, marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13.5, color: cor.texto }}>
              {diaSelecionado.getDate()} de {MESES[mes].toLowerCase()}
            </span>
            <button onClick={() => { setDiaSelecionado(null); limparFormulario(); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <X size={16} color={cor.mudo} />
            </button>
          </div>

          {eventosDoDiaSelecionado.length === 0 ? (
            <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo, margin: '0 0 4px' }}>Nada marcado nesse dia ainda.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: souLider ? 14 : 0 }}>
              {eventosDoDiaSelecionado.map((e) => {
                const dId = dateId(diaSelecionado);
                const confirmacoes = e.confirmacoes || {};
                const meuStatus = meuNome ? confirmacoes[meuNome] : null;
                const vao = Object.entries(confirmacoes).filter(([, s]) => s === 'vou').map(([n]) => n);
                const naoVao = Object.entries(confirmacoes).filter(([, s]) => s === 'nao').map(([n]) => n);
                return (
                  <div key={e.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, background: cor.painelAlt, borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <Megaphone size={14} color={cor.ouro} style={{ marginTop: 2, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13.5, color: cor.texto }}>{e.titulo}</span>
                          {e.destaque && <Star size={12} color={cor.ouro} fill={cor.ouro} />}
                        </div>
                        {(e.horario || e.local || e.endereco) && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 3 }}>
                            {e.horario && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo }}>
                                <Clock size={11} /> {e.horario}
                              </span>
                            )}
                            {e.local && (
                              <span style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo }}>
                                <strong style={{ color: cor.texto }}>Local:</strong> {e.local}
                              </span>
                            )}
                            {e.endereco && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo }}>
                                <a href={linkMapa(e.endereco)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                                  <MapPin size={12} color={cor.ouro} />
                                </a>
                                <span><strong style={{ color: cor.texto }}>Endereço:</strong> {e.endereco}</span>
                              </span>
                            )}
                          </div>
                        )}
                        {e.obs && (
                          <p style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo, margin: '5px 0 0', lineHeight: 1.4 }}>
                            <strong style={{ color: cor.texto }}>OBS:</strong> {e.obs}
                          </p>
                        )}
                      </div>
                      {souLider && (
                        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                          <button onClick={() => alternarDestaque(dId, e.id)} title="Fixar como destaque" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2 }}>
                            <Star size={13} color={e.destaque ? cor.ouro : cor.mudo} fill={e.destaque ? cor.ouro : 'none'} />
                          </button>
                          <button onClick={() => editarAviso(e)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2 }}>
                            <Pencil size={13} color={cor.mudo} />
                          </button>
                          <button onClick={() => remover(dId, e.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2 }}>
                            <Trash2 size={13} color={cor.mudo} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                      <button
                        onClick={() => confirmarPresenca(dId, e.id, 'vou')}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 999, border: `1.5px solid ${meuStatus === 'vou' ? cor.sucesso : cor.borda}`, background: meuStatus === 'vou' ? 'rgba(111,162,135,0.15)' : 'transparent', color: meuStatus === 'vou' ? cor.sucesso : cor.mudo, fontFamily: 'Inter', fontWeight: 600, fontSize: 11.5, cursor: 'pointer' }}
                      >
                        ✅ Vou
                      </button>
                      <button
                        onClick={() => confirmarPresenca(dId, e.id, 'nao')}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 999, border: `1.5px solid ${meuStatus === 'nao' ? cor.erro : cor.borda}`, background: meuStatus === 'nao' ? 'rgba(193,102,107,0.15)' : 'transparent', color: meuStatus === 'nao' ? cor.erro : cor.mudo, fontFamily: 'Inter', fontWeight: 600, fontSize: 11.5, cursor: 'pointer' }}
                      >
                        ❌ Não vou
                      </button>
                      <button
                        onClick={() => setVerConfirmados(verConfirmados === e.id ? null : e.id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo, textDecoration: 'underline' }}
                      >
                        {vao.length} confirmado{vao.length === 1 ? '' : 's'}{naoVao.length > 0 ? ` · ${naoVao.length} não vai${naoVao.length === 1 ? '' : 'o'}` : ''}
                      </button>
                    </div>

                    {verConfirmados === e.id && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <p style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.texto, margin: 0, lineHeight: 1.5 }}>
                          {vao.length > 0 ? `✅ Vão: ${vao.join(', ')}` : '✅ Ninguém confirmou presença ainda.'}
                        </p>
                        {naoVao.length > 0 && (
                          <p style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo, margin: 0, lineHeight: 1.5 }}>
                            ❌ Não vão: {naoVao.join(', ')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {souLider && (
            <div>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Nome do evento (ex: Culto de jovens)"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13.5, outline: 'none', marginBottom: 8 }}
              />
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <input
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  placeholder="Horário (ex: 19h30)"
                  style={{ flex: 1, minWidth: 0, padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13.5, outline: 'none' }}
                />
                <input
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Local (opcional)"
                  style={{ flex: 1, minWidth: 0, padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13.5, outline: 'none' }}
                />
              </div>
              <input
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Endereço (opcional — abre no Google Maps)"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13.5, outline: 'none', marginBottom: 10 }}
              />
              <textarea
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                placeholder="OBS: informações extras (ex: leve algo pra beber e comer)"
                rows={2}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13, outline: 'none', resize: 'vertical', marginBottom: 10 }}
              />
              <button
                onClick={() => setDestaqueMarcado(!destaqueMarcado)}
                style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 0 10px' }}
              >
                <div style={{ width: 17, height: 17, borderRadius: 5, border: `1.5px solid ${destaqueMarcado ? cor.ouro : cor.borda}`, background: destaqueMarcado ? cor.ouro : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {destaqueMarcado && <Check size={12} color="#161B33" strokeWidth={3} />}
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 12.5, color: cor.texto }}>Fixar como destaque (aparece no topo do Quiz)</span>
              </button>
              {editandoId && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <Pencil size={12} color={cor.ouro} />
                  <span style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.ouro, fontWeight: 600 }}>Editando aviso</span>
                  <button onClick={limparFormulario} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo, textDecoration: 'underline' }}>
                    cancelar
                  </button>
                </div>
              )}
              <button
                onClick={salvar}
                disabled={!titulo.trim() || salvando}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 9, border: 'none', background: titulo.trim() ? cor.ouro : cor.mudoSuave, color: titulo.trim() ? '#161B33' : cor.mudo, fontFamily: 'Inter', fontWeight: 700, fontSize: 13, cursor: titulo.trim() ? 'pointer' : 'default' }}
              >
                {editandoId ? <Pencil size={14} /> : <Plus size={14} />} {salvando ? 'Salvando…' : editandoId ? 'Salvar alterações' : 'Adicionar aviso'}
              </button>
            </div>
          )}
        </div>
      )}

      {agenda.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 16.5, color: cor.texto, margin: 0 }}>Agenda de {MESES[mes]}</h3>
            <button onClick={exportarAgenda} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'transparent', border: `1px solid ${cor.borda}`, borderRadius: 999, padding: '6px 11px', cursor: 'pointer', color: cor.texto, fontFamily: 'Inter', fontSize: 11.5, fontWeight: 600 }}>
              <Share2 size={12} /> Exportar
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {agenda.map((e) => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 12, padding: '10px 13px' }}>
                <div style={{ width: 40, textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 15, color: cor.ouro }}>{e.data.slice(-2)}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 9, color: cor.mudo, textTransform: 'uppercase' }}>{MESES[mes].slice(0, 3)}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: cor.texto, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.titulo}</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
                    {e.horario && <span style={{ fontFamily: 'Inter', fontSize: 11, color: cor.mudo }}>{e.horario}</span>}
                    {e.local && (
                      <span style={{ fontFamily: 'Inter', fontSize: 11, color: cor.mudo }}>
                        <strong style={{ color: cor.texto }}>Local:</strong> {e.local}
                      </span>
                    )}
                    {e.endereco && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter', fontSize: 11, color: cor.mudo }}>
                        <a href={linkMapa(e.endereco)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                          <MapPin size={11} color={cor.ouro} />
                        </a>
                        <span><strong style={{ color: cor.texto }}>Endereço:</strong> {e.endereco}</span>
                      </span>
                    )}
                  </div>
                  {e.obs && (
                    <p style={{ fontFamily: 'Inter', fontSize: 10.5, color: cor.mudo, margin: '3px 0 0', lineHeight: 1.3 }}>
                      <strong style={{ color: cor.texto }}>OBS:</strong> {e.obs}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   PAINEL: PLANEJAMENTO (calendário privado, só para líderes)
--------------------------------------------------------- */
function PainelPlanejamento({ membros, meuNome, onFechar }) {
  const agora = new Date();
  const [ano, setAno] = useState(agora.getFullYear());
  const [mes, setMes] = useState(agora.getMonth());
  const [dados, setDados] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [horario, setHorario] = useState('');
  const [local, setLocal] = useState('');
  const [endereco, setEndereco] = useState('');
  const [obs, setObs] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [salvando, setSalvando] = useState(false);

  const mid = `${ano}-${pad(mes + 1)}`;
  const semanas = gerarSemanasCompletas(ano, mes);
  const hojeId = dateId(agora);

  useEffect(() => {
    (async () => {
      setCarregando(true);
      try {
        const r = await window.storage.get(`planejamento:${mid}`, true);
        setDados(r ? JSON.parse(r.value) : {});
      } catch { setDados({}); }
      setCarregando(false);
      setDiaSelecionado(null);
      limparFormulario();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mid]);

  const mudarMes = (delta) => {
    let m = mes + delta, a = ano;
    if (m < 0) { m = 11; a -= 1; }
    if (m > 11) { m = 0; a += 1; }
    setMes(m); setAno(a);
  };

  function limparFormulario() {
    setEditandoId(null);
    setTitulo(''); setHorario(''); setLocal(''); setEndereco(''); setObs('');
  }

  const selecionarDia = (d) => {
    setDiaSelecionado(d);
    limparFormulario();
  };

  const editarItem = (item) => {
    setEditandoId(item.id);
    setTitulo(item.titulo);
    setHorario(item.horario || '');
    setLocal(item.local || '');
    setEndereco(item.endereco || '');
    setObs(item.obs || '');
  };

  const salvar = async () => {
    if (!diaSelecionado || !titulo.trim()) return;
    setSalvando(true);
    const dId = dateId(diaSelecionado);
    let novo;
    if (editandoId) {
      novo = {
        ...dados,
        [dId]: (dados[dId] || []).map((item) => (
          item.id === editandoId
            ? { ...item, titulo: titulo.trim(), horario: horario.trim(), local: local.trim(), endereco: endereco.trim(), obs: obs.trim() }
            : item
        )),
      };
    } else {
      const novoItem = { id: gerarId(), titulo: titulo.trim(), horario: horario.trim(), local: local.trim(), endereco: endereco.trim(), obs: obs.trim(), comentarios: [] };
      novo = { ...dados, [dId]: [...(dados[dId] || []), novoItem] };
    }
    setDados(novo);
    limparFormulario();
    try { await window.storage.set(`planejamento:${mid}`, JSON.stringify(novo), true); } catch { /* tenta depois */ }
    setSalvando(false);
  };

  const remover = async (dId, itemId) => {
    const restantes = (dados[dId] || []).filter((item) => item.id !== itemId);
    const novo = { ...dados };
    if (restantes.length > 0) novo[dId] = restantes; else delete novo[dId];
    setDados(novo);
    if (editandoId === itemId) limparFormulario();
    try { await window.storage.set(`planejamento:${mid}`, JSON.stringify(novo), true); } catch { /* tenta depois */ }
  };

  const comentar = async (dId, itemId, texto) => {
    const atualizada = (dados[dId] || []).map((item) => (
      item.id === itemId
        ? { ...item, comentarios: [...(item.comentarios || []), { id: gerarId(), nome: meuNome, texto, ts: Date.now() }] }
        : item
    ));
    const novo = { ...dados, [dId]: atualizada };
    setDados(novo);
    try { await window.storage.set(`planejamento:${mid}`, JSON.stringify(novo), true); } catch { /* tenta depois */ }
  };

  const itensDoDia = diaSelecionado ? (dados[dateId(diaSelecionado)] || []) : [];

  return (
    <div style={{ position: 'fixed', inset: 0, background: cor.bg, zIndex: 60, overflowY: 'auto' }}>
      <div style={{ width: '100%', maxWidth: 440, margin: '0 auto', padding: '20px 18px 60px', minHeight: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <button onClick={onFechar} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={18} color={cor.mudo} />
          </button>
          <CalendarClock size={17} color={cor.ouro} />
          <span style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 17, color: cor.texto }}>Planejamento</span>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 12, color: cor.mudo, margin: '2px 0 18px 32px' }}>Visível só pra líderes — pra organizar antes de publicar em Avisos.</p>

        <div style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 16, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button onClick={() => mudarMes(-1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
              <ChevronLeft size={18} color={cor.mudo} />
            </button>
            <span style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 15, color: cor.texto }}>{MESES[mes]} {ano}</span>
            <button onClick={() => mudarMes(1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
              <ChevronRight size={18} color={cor.mudo} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 6 }}>
            {DIAS_SEMANA_COMPLETA.map((d) => (
              <div key={d} style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 9.5, fontWeight: 700, color: cor.mudo, textTransform: 'uppercase' }}>{d}</div>
            ))}
          </div>

          {carregando ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Loader2 className="spin" size={20} color={cor.ouro} /></div>
          ) : (
            semanas.map((semana, si) => (
              <div key={si} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 3 }}>
                {semana.map((d, di) => {
                  if (!d) return <div key={di} />;
                  const dId = dateId(d);
                  const itens = dados[dId] || [];
                  const ehHoje = dId === hojeId;
                  const ehSelecionado = diaSelecionado && dateId(diaSelecionado) === dId;
                  return (
                    <button
                      key={di}
                      onClick={() => selecionarDia(d)}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 3,
                        background: ehSelecionado ? 'rgba(227,178,60,0.16)' : ehHoje ? 'rgba(227,178,60,0.08)' : 'transparent',
                        border: `1px solid ${ehSelecionado || ehHoje ? cor.ouro : cor.borda}`, borderRadius: 9, padding: '5px 1px', minHeight: 40,
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10.5, color: ehHoje || ehSelecionado ? cor.ouro : cor.mudo, fontWeight: 700 }}>{d.getDate()}</span>
                      {itens.length > 0 && (
                        <div style={{ display: 'flex', gap: 2 }}>
                          {itens.slice(0, 3).map((_, i) => (
                            <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: cor.ouro }} />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {diaSelecionado && (
          <div style={{ background: cor.painel, border: `1px solid ${cor.ouro}`, borderRadius: 16, padding: 16, marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13.5, color: cor.texto }}>
                {diaSelecionado.getDate()} de {MESES[mes].toLowerCase()}
              </span>
              <button onClick={() => { setDiaSelecionado(null); limparFormulario(); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={16} color={cor.mudo} />
              </button>
            </div>

            {itensDoDia.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                {itensDoDia.map((item) => {
                  const dId = dateId(diaSelecionado);
                  return (
                    <div key={item.id} style={{ background: cor.painelAlt, borderRadius: 10, padding: '10px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <CalendarClock size={14} color={cor.ouro} style={{ marginTop: 2, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13.5, color: cor.texto }}>{item.titulo}</span>
                          {(item.horario || item.local || item.endereco) && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 3 }}>
                              {item.horario && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo }}>
                                  <Clock size={11} /> {item.horario}
                                </span>
                              )}
                              {item.local && (
                                <span style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo }}>
                                  <strong style={{ color: cor.texto }}>Local:</strong> {item.local}
                                </span>
                              )}
                              {item.endereco && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo }}>
                                  <a href={linkMapa(item.endereco)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                                    <MapPin size={12} color={cor.ouro} />
                                  </a>
                                  <span><strong style={{ color: cor.texto }}>Endereço:</strong> {item.endereco}</span>
                                </span>
                              )}
                            </div>
                          )}
                          {item.obs && (
                            <p style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo, margin: '5px 0 0', lineHeight: 1.4 }}>
                              <strong style={{ color: cor.texto }}>OBS:</strong> {item.obs}
                            </p>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                          <button onClick={() => editarItem(item)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2 }}>
                            <Pencil size={13} color={cor.mudo} />
                          </button>
                          <button onClick={() => remover(dId, item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2 }}>
                            <Trash2 size={13} color={cor.mudo} />
                          </button>
                        </div>
                      </div>
                      <Comentarios comentarios={item.comentarios} meuNome={meuNome} onComentar={(texto) => comentar(dId, item.id, texto)} />
                    </div>
                  );
                })}
              </div>
            )}

            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Nome do item (ex: Reunião de planejamento)"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13.5, outline: 'none', marginBottom: 8 }}
            />
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                placeholder="Horário"
                style={{ flex: 1, minWidth: 0, padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13.5, outline: 'none' }}
              />
              <input
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Local"
                style={{ flex: 1, minWidth: 0, padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13.5, outline: 'none' }}
              />
            </div>
            <input
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço (opcional — abre no Google Maps)"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13.5, outline: 'none', marginBottom: 8 }}
            />
            <textarea
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              placeholder="OBS: informações extras"
              rows={2}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 9, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 13, outline: 'none', resize: 'vertical', marginBottom: 10 }}
            />

            {editandoId && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Pencil size={12} color={cor.ouro} />
                <span style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.ouro, fontWeight: 600 }}>Editando</span>
                <button onClick={limparFormulario} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo, textDecoration: 'underline' }}>
                  cancelar
                </button>
              </div>
            )}
            <button
              onClick={salvar}
              disabled={!titulo.trim() || salvando}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 9, border: 'none', background: titulo.trim() ? cor.ouro : cor.mudoSuave, color: titulo.trim() ? '#161B33' : cor.mudo, fontFamily: 'Inter', fontWeight: 700, fontSize: 13, cursor: titulo.trim() ? 'pointer' : 'default' }}
            >
              {editandoId ? <Pencil size={14} /> : <Plus size={14} />} {salvando ? 'Salvando…' : editandoId ? 'Salvar alterações' : 'Adicionar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   ABA: MEMBROS
--------------------------------------------------------- */
function AbaMembros({ membros, meuNome, adicionarMembro, removerMembro, definirFoto, carregandoFotoId, alternarLider, definirAniversario, onAbrirPerfil }) {
  const [novoNome, setNovoNome] = useState('');
  const [editandoAniversario, setEditandoAniversario] = useState(null);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(null);
  const souLider = souLiderDe(membros, meuNome);
  const podeEditarFoto = (m) => souLider || (meuNome && m.nome.trim().toLowerCase() === meuNome.trim().toLowerCase());

  const [presenca, setPresenca] = useState(null);
  const [carregandoPresenca, setCarregandoPresenca] = useState(false);

  const carregarPresenca = async () => {
    setCarregandoPresenca(true);
    try {
      const r = await window.storage.get('presenca', true);
      setPresenca(r ? JSON.parse(r.value) : {});
    } catch { setPresenca({}); }
    setCarregandoPresenca(false);
  };

  useEffect(() => {
    carregarPresenca();
  }, []);

  const agora = Date.now();
  const online = presenca ? Object.entries(presenca).filter(([, ts]) => agora - ts < JANELA_PRESENCA_MS).sort((a, b) => b[1] - a[1]) : [];

  const [respostasHoje, setRespostasHoje] = useState(null);
  const [carregandoResumo, setCarregandoResumo] = useState(false);

  useEffect(() => {
    if (!souLider) return;
    (async () => {
      setCarregandoResumo(true);
      try {
        const r = await window.storage.get(`respostas:${dateId(new Date())}`, true);
        setRespostasHoje(r ? JSON.parse(r.value) : {});
      } catch { setRespostasHoje({}); }
      setCarregandoResumo(false);
    })();
  }, [souLider]);

  const adicionar = () => {
    if (!novoNome.trim()) return;
    adicionarMembro(novoNome.trim());
    setNovoNome('');
  };

  const mesAtual = new Date().getMonth();
  const aniversariantes = membros.filter((m) => m.aniversario && parseInt(m.aniversario.split('/')[1], 10) - 1 === mesAtual);

  return (
    <div style={{ padding: '4px 18px 100px' }}>
      <h2 style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 21, color: cor.texto, margin: '14px 0 4px' }}>Membros</h2>
      <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo, margin: '0 0 16px' }}>
        {membros.length} cadastrados{souLider ? ' · toque na foto pra adicionar ou trocar (a de qualquer um).' : ' · toque na sua própria foto pra adicionar ou trocar.'}
      </p>

      {souLider && respostasHoje !== null && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: cor.painelAlt, border: `1px solid ${cor.borda}`, borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
          <BookOpen size={16} color={cor.ouro} style={{ flexShrink: 0 }} />
          <span style={{ fontFamily: 'Inter', fontSize: 12.5, color: cor.texto }}>
            <strong>{Object.keys(respostasHoje).length}</strong> de <strong>{membros.length}</strong> membros responderam o quiz hoje
          </span>
          {carregandoResumo && <Loader2 size={13} color={cor.mudo} className="spin" />}
        </div>
      )}

      <div style={{ background: cor.painelAlt, border: `1px solid ${cor.borda}`, borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: online.length ? 8 : 0 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 11.5, fontWeight: 700, color: cor.mudo, textTransform: 'uppercase', letterSpacing: 0.4 }}>Quem está online agora</span>
          <button onClick={carregarPresenca} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, display: 'flex' }}>
            {carregandoPresenca ? <Loader2 size={13} color={cor.mudo} className="spin" /> : <span style={{ fontFamily: 'Inter', fontSize: 11, color: cor.ouro, fontWeight: 600 }}>atualizar</span>}
          </button>
        </div>
        {online.length === 0 ? (
          <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: cor.mudo, margin: 0 }}>Ninguém com o app aberto no momento.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {online.map(([n]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 5, background: cor.painel, borderRadius: 999, padding: '5px 10px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: cor.sucesso }} />
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: cor.texto }}>{n}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {aniversariantes.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: cor.painelAlt, border: `1px solid ${cor.borda}`, borderRadius: 12, padding: '11px 14px', marginBottom: 16 }}>
          <Cake size={16} color={cor.ouro} />
          <span style={{ fontFamily: 'Inter', fontSize: 12.5, color: cor.texto }}>
            Aniversariantes de {MESES[mesAtual]}: <strong>{aniversariantes.map((m) => m.nome.split(' ')[0]).join(', ')}</strong>
          </span>
        </div>
      )}

      {souLider && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          <input
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && adicionar()}
            placeholder="Nome do novo membro"
            style={{ flex: 1, minWidth: 0, padding: '11px 14px', borderRadius: 10, border: `1px solid ${cor.borda}`, background: cor.painel, color: cor.texto, fontFamily: 'Inter', fontSize: 14, outline: 'none' }}
          />
          <button onClick={adicionar} style={{ display: 'flex', alignItems: 'center', gap: 4, background: cor.ouro, border: 'none', borderRadius: 10, padding: '0 14px', cursor: 'pointer', color: '#161B33', fontFamily: 'Inter', fontWeight: 700, fontSize: 13 }}>
            <Plus size={15} /> Adicionar
          </button>
        </div>
      )}

      {membros.length === 0 ? (
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo }}>Nenhum membro cadastrado ainda.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 14, rowGap: 22 }}>
          {membros.map((m) => (
            <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative', paddingTop: 10, isolation: 'isolate' }}>
              {souLider && (
                <button
                  onClick={() => setConfirmandoExclusao(m)}
                  style={{ position: 'absolute', top: 0, right: 4, background: cor.painelAlt, border: `1px solid ${cor.borda}`, borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
                >
                  <X size={11} color={cor.mudo} />
                </button>
              )}
              {souLider && (
                <button
                  onClick={() => alternarLider(m.id)}
                  title="Marcar como líder"
                  style={{ position: 'absolute', top: 0, left: 4, background: m.lider ? cor.ouro : cor.painelAlt, border: `1px solid ${m.lider ? cor.ouro : cor.borda}`, borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
                >
                  <Crown size={11} color={m.lider ? '#161B33' : cor.mudo} />
                </button>
              )}
              {!souLider && m.lider && (
                <div style={{ position: 'absolute', top: 0, left: 4, background: cor.ouro, borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  <Crown size={11} color="#161B33" />
                </div>
              )}
              <div style={{ marginTop: 6 }}>
                {podeEditarFoto(m) ? (
                  <label htmlFor={`foto-${m.id}`} style={{ cursor: 'pointer', position: 'relative', display: 'block' }}>
                    <Avatar nome={m.nome} foto={m.foto} tamanho={68} />
                    <div style={{ position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderRadius: '50%', background: cor.ouro, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${cor.bg}` }}>
                      {carregandoFotoId === m.id ? <Loader2 size={11} color="#161B33" className="spin" /> : <Camera size={11} color="#161B33" />}
                    </div>
                  </label>
                ) : (
                  <Avatar nome={m.nome} foto={m.foto} tamanho={68} />
                )}
              </div>
              {podeEditarFoto(m) && (
                <input
                  id={`foto-${m.id}`} type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={(e) => { if (e.target.files[0]) definirFoto(m.id, e.target.files[0]); e.target.value = ''; }}
                />
              )}
              <button onClick={() => onAbrirPerfil(m)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: cor.texto, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 84, display: 'block' }}>{m.nome}</span>
              </button>

              {souLider ? (
                editandoAniversario === m.id ? (
                  <input
                    autoFocus
                    defaultValue={m.aniversario || ''}
                    placeholder="DD/MM"
                    onBlur={(e) => { definirAniversario(m.id, e.target.value.trim()); setEditandoAniversario(null); }}
                    onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                    style={{ width: 60, textAlign: 'center', padding: '3px 4px', borderRadius: 6, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 11, outline: 'none' }}
                  />
                ) : (
                  <button onClick={() => setEditandoAniversario(m.id)} style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'transparent', border: 'none', cursor: 'pointer', color: cor.mudo, fontFamily: 'Inter', fontSize: 10.5 }}>
                    <Cake size={10} /> {m.aniversario || 'aniversário'}
                  </button>
                )
              ) : (
                m.aniversario && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: cor.mudo, fontFamily: 'Inter', fontSize: 10.5 }}>
                    <Cake size={10} /> {m.aniversario}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      )}

      {confirmandoExclusao && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setConfirmandoExclusao(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 320, background: cor.painel, borderRadius: 18, padding: 22, textAlign: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(193,102,107,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <AlertTriangle size={20} color={cor.erro} />
            </div>
            <p style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 16, color: cor.texto, margin: '0 0 6px' }}>Excluir {confirmandoExclusao.nome}?</p>
            <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: cor.mudo, margin: '0 0 18px', lineHeight: 1.5 }}>Essa pessoa some da lista de membros. O ranking e o histórico dela não são apagados.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setConfirmandoExclusao(null)} style={{ flex: 1, padding: '11px 0', borderRadius: 10, border: `1px solid ${cor.borda}`, background: 'transparent', color: cor.texto, fontFamily: 'Inter', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}>
                Cancelar
              </button>
              <button
                onClick={() => { removerMembro(confirmandoExclusao.id); setConfirmandoExclusao(null); }}
                style={{ flex: 1, padding: '11px 0', borderRadius: 10, border: 'none', background: cor.erro, color: '#fff', fontFamily: 'Inter', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   ABA: DEVOCIONAL DO DIA
--------------------------------------------------------- */
const EMOJIS_REACAO = ['❤️', '🙏', '👏'];
const formatarDataCurta = (dId) => { const [, m, d] = dId.split('-'); return `${d}/${m}`; };

function Comentarios({ comentarios, meuNome, onComentar }) {
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async () => {
    if (!texto.trim() || enviando) return;
    setEnviando(true);
    await onComentar(texto.trim());
    setTexto('');
    setEnviando(false);
  };

  return (
    <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${cor.borda}` }}>
      {comentarios && comentarios.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
          {comentarios.map((c) => (
            <div key={c.id} style={{ display: 'flex', gap: 8 }}>
              <Avatar nome={c.nome} tamanho={24} />
              <div style={{ flex: 1, background: cor.painelAlt, borderRadius: 10, padding: '7px 10px' }}>
                <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11.5, color: cor.texto }}>{c.nome}</span>
                <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: cor.texto, margin: '2px 0 0', lineHeight: 1.4 }}>{c.texto}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviar()}
          placeholder="Escreva um comentário…"
          style={{ flex: 1, minWidth: 0, padding: '9px 12px', borderRadius: 999, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 12.5, outline: 'none' }}
        />
        <button
          onClick={enviar}
          disabled={!texto.trim() || enviando}
          style={{ background: texto.trim() ? cor.ouro : cor.mudoSuave, border: 'none', borderRadius: 999, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: texto.trim() ? 'pointer' : 'default', flexShrink: 0 }}
        >
          <Share2 size={13} color={texto.trim() ? '#161B33' : cor.mudo} style={{ transform: 'rotate(-45deg)' }} />
        </button>
      </div>
    </div>
  );
}

function BarraReacoes({ reacoes, meuNome, onReagir, somenteLeitura }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
      {EMOJIS_REACAO.map((emoji) => {
        const lista = (reacoes && reacoes[emoji]) || [];
        const jaReagiu = meuNome && lista.includes(meuNome);
        const Tag = somenteLeitura ? 'div' : 'button';
        return (
          <Tag
            key={emoji}
            onClick={somenteLeitura ? undefined : () => onReagir(emoji)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', borderRadius: 999,
              border: `1.5px solid ${jaReagiu ? cor.ouro : cor.borda}`,
              background: jaReagiu ? 'rgba(227,178,60,0.12)' : 'transparent',
              cursor: somenteLeitura ? 'default' : 'pointer', fontFamily: 'Inter', fontSize: 12.5,
              color: jaReagiu ? cor.ouro : cor.mudo, fontWeight: jaReagiu ? 700 : 500,
            }}
          >
            <span>{emoji}</span>
            <span>{lista.length}</span>
          </Tag>
        );
      })}
    </div>
  );
}

function ConteudoDevocional({ devocional }) {
  // compatibilidade com registros antigos (formato tipo/conteudo, um ou outro)
  const texto = devocional.texto ?? (devocional.tipo === 'texto' ? devocional.conteudo : null);
  const audio = devocional.audio ?? (devocional.tipo === 'audio' ? devocional.conteudo : null);
  return (
    <>
      {texto && (
        <div style={{ marginBottom: audio ? 18 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <FileText size={14} color={cor.ouro} />
            <span style={{ fontFamily: 'Inter', fontSize: 11.5, fontWeight: 700, color: cor.ouro, textTransform: 'uppercase', letterSpacing: 0.4 }}>Devocional escrito</span>
          </div>
          <p style={{ fontFamily: 'Inter', fontSize: 14.5, color: cor.texto, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{texto}</p>
        </div>
      )}
      {audio && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Mic size={14} color={cor.ouro} />
            <span style={{ fontFamily: 'Inter', fontSize: 11.5, fontWeight: 700, color: cor.ouro, textTransform: 'uppercase', letterSpacing: 0.4 }}>Áudio</span>
          </div>
          <audio controls src={audio} style={{ width: '100%' }} />
        </div>
      )}
    </>
  );
}

function AbaDevocional({ membros, meuNome }) {
  const hoje = new Date();
  const did = dateId(hoje);
  const mid = monthId(hoje);
  const amanha = new Date(hoje); amanha.setDate(hoje.getDate() + 1);
  const didAmanha = dateId(amanha);
  const midAmanha = monthId(amanha);

  const [carregando, setCarregando] = useState(true);
  const [atribuicao, setAtribuicao] = useState(null);
  const [atribuicaoAmanha, setAtribuicaoAmanha] = useState(null);
  const [devocional, setDevocional] = useState(null);
  const [texto, setTexto] = useState('');
  const [audioAnexado, setAudioAnexado] = useState(null);
  const [gravando, setGravando] = useState(false);
  const [tempoGravado, setTempoGravado] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  const gravadorRef = useRef(null);
  const pedacosRef = useRef([]);
  const cronometroRef = useRef(null);

  const [aba, setAba] = useState('hoje');
  const [historico, setHistorico] = useState(null);
  const [carregandoHistorico, setCarregandoHistorico] = useState(false);

  const souLider = souLiderDe(membros, meuNome);

  // garante que o microfone e o cronômetro sejam encerrados se a pessoa sair da tela gravando
  useEffect(() => {
    return () => {
      clearInterval(cronometroRef.current);
      if (gravadorRef.current && gravadorRef.current.state !== 'inactive') {
        gravadorRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      setCarregando(true);
      const [rEscala, rDevocional, rEscalaAmanha] = await Promise.allSettled([
        window.storage.get(`escala:${mid}`, true),
        window.storage.get(`devocional:${did}`, true),
        midAmanha === mid ? Promise.resolve(null) : window.storage.get(`escala:${midAmanha}`, true),
      ]);
      let escalaDoMes = {};
      if (rEscala.status === 'fulfilled' && rEscala.value) {
        escalaDoMes = JSON.parse(rEscala.value.value);
        setAtribuicao(escalaDoMes[did] || null);
      } else {
        setAtribuicao(null);
      }
      if (midAmanha === mid) {
        setAtribuicaoAmanha(escalaDoMes[didAmanha] || null);
      } else if (rEscalaAmanha.status === 'fulfilled' && rEscalaAmanha.value) {
        const escalaMesSeguinte = JSON.parse(rEscalaAmanha.value.value);
        setAtribuicaoAmanha(escalaMesSeguinte[didAmanha] || null);
      } else {
        setAtribuicaoAmanha(null);
      }
      if (rDevocional.status === 'fulfilled' && rDevocional.value) {
        setDevocional(JSON.parse(rDevocional.value.value));
      } else {
        setDevocional(null);
      }
      setCarregando(false);
    })();
  }, [did, mid, didAmanha, midAmanha]);

  const souEu = !!(atribuicao && meuNome && atribuicao.nome.trim().toLowerCase() === meuNome.trim().toLowerCase());
  const amanhaSouEu = !!(atribuicaoAmanha && meuNome && atribuicaoAmanha.nome.trim().toLowerCase() === meuNome.trim().toLowerCase());
  const membro = atribuicao ? membros.find((m) => m.id === atribuicao.membroId) : null;

  const registrarNoIndice = async () => {
    try {
      const r = await window.storage.get('devocional-datas', true);
      const lista = r ? JSON.parse(r.value) : [];
      if (!lista.includes(did)) {
        lista.push(did);
        await window.storage.set('devocional-datas', JSON.stringify(lista), true);
      }
    } catch {
      try { await window.storage.set('devocional-datas', JSON.stringify([did]), true); } catch { /* ignora */ }
    }
  };

  const iniciarGravacao = async () => {
    setErro('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErro('Esse navegador não permite gravar áudio por aqui.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const gravador = new MediaRecorder(stream);
      pedacosRef.current = [];
      gravador.ondataavailable = (ev) => { if (ev.data.size > 0) pedacosRef.current.push(ev.data); };
      gravador.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        try {
          const blob = new Blob(pedacosRef.current, { type: gravador.mimeType || 'audio/webm' });
          const base64 = await new Promise((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(r.result);
            r.onerror = rej;
            r.readAsDataURL(blob);
          });
          setAudioAnexado(base64);
        } catch { setErro('Não foi possível processar a gravação.'); }
      };
      gravador.start();
      gravadorRef.current = gravador;
      setTempoGravado(0);
      setGravando(true);
      cronometroRef.current = setInterval(() => {
        setTempoGravado((t) => {
          if (t + 1 >= DURACAO_MAX_AUDIO) { pararGravacao(); return DURACAO_MAX_AUDIO; }
          return t + 1;
        });
      }, 1000);
    } catch {
      setErro('Não foi possível acessar o microfone. Verifique a permissão do navegador.');
    }
  };

  const pararGravacao = () => {
    clearInterval(cronometroRef.current);
    if (gravadorRef.current && gravadorRef.current.state !== 'inactive') {
      gravadorRef.current.stop();
    }
    setGravando(false);
  };

  const formatarTempo = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const publicar = async () => {
    if (!texto.trim() && !audioAnexado) { setErro('Escreva o devocional e/ou anexe um áudio antes de publicar.'); return; }
    setErro(''); setEnviando(true);
    const registro = {
      texto: texto.trim() || null,
      audio: audioAnexado || null,
      ts: Date.now(), nome: atribuicao?.nome, membroId: atribuicao?.membroId, reacoes: {},
    };
    try {
      await window.storage.set(`devocional:${did}`, JSON.stringify(registro), true);
      setDevocional(registro);
      registrarNoIndice();
    } catch { setErro('Não foi possível publicar agora. Tenta de novo.'); }
    setEnviando(false);
  };

  const reagir = async (emoji) => {
    if (!devocional || !meuNome) return;
    const reacoesAtuais = devocional.reacoes || {};
    const lista = reacoesAtuais[emoji] || [];
    const jaReagiu = lista.includes(meuNome);
    const novaLista = jaReagiu ? lista.filter((n) => n !== meuNome) : [...lista, meuNome];
    const novoDevocional = { ...devocional, reacoes: { ...reacoesAtuais, [emoji]: novaLista } };
    setDevocional(novoDevocional);
    try { await window.storage.set(`devocional:${did}`, JSON.stringify(novoDevocional), true); } catch { /* tenta depois */ }
  };

  const comentar = async (texto) => {
    if (!devocional || !meuNome) return;
    const novoComentario = { id: gerarId(), nome: meuNome, texto, ts: Date.now() };
    const novoDevocional = { ...devocional, comentarios: [...(devocional.comentarios || []), novoComentario] };
    setDevocional(novoDevocional);
    try { await window.storage.set(`devocional:${did}`, JSON.stringify(novoDevocional), true); } catch { /* tenta depois */ }
  };

  const comentarHistorico = async (dId, texto) => {
    if (!meuNome) return;
    const item = (historico || []).find((h) => h.data === dId);
    if (!item) return;
    const novoComentario = { id: gerarId(), nome: meuNome, texto, ts: Date.now() };
    const { data, ...resto } = item;
    const atualizado = { ...resto, comentarios: [...(item.comentarios || []), novoComentario] };
    setHistorico((h) => h.map((x) => (x.data === dId ? { data: dId, ...atualizado } : x)));
    try { await window.storage.set(`devocional:${dId}`, JSON.stringify(atualizado), true); } catch { /* tenta depois */ }
  };

  const abrirHistorico = async () => {
    setAba('historico');
    if (historico !== null) return;
    setCarregandoHistorico(true);
    try {
      const r = await window.storage.get('devocional-datas', true);
      const datas = r ? JSON.parse(r.value) : [];
      const anteriores = datas.filter((d) => d !== did).sort((a, b) => b.localeCompare(a)).slice(0, 20);
      const resultados = await Promise.allSettled(anteriores.map((d) => window.storage.get(`devocional:${d}`, true)));
      const lista = anteriores
        .map((d, i) => (resultados[i].status === 'fulfilled' && resultados[i].value ? { data: d, ...JSON.parse(resultados[i].value.value) } : null))
        .filter(Boolean);
      setHistorico(lista);
    } catch { setHistorico([]); }
    setCarregandoHistorico(false);
  };

  const excluirDoHistorico = async (dId) => {
    setHistorico((h) => (h ? h.filter((item) => item.data !== dId) : h));
    try { await window.storage.delete(`devocional:${dId}`, true); } catch { /* já pode não existir */ }
    try {
      const r = await window.storage.get('devocional-datas', true);
      const lista = r ? JSON.parse(r.value) : [];
      await window.storage.set('devocional-datas', JSON.stringify(lista.filter((d) => d !== dId)), true);
    } catch { /* tenta depois */ }
  };

  if (carregando) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Loader2 className="spin" size={22} color={cor.ouro} /></div>;

  return (
    <div style={{ padding: '4px 18px 100px' }}>
      <h2 style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 21, color: cor.texto, margin: '14px 0 12px' }}>Devocional</h2>

      {amanhaSouEu && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(227,178,60,0.12)', border: `1px solid ${cor.ouro}`, borderRadius: 12, padding: '11px 14px', marginBottom: 16 }}>
          <BellRing size={16} color={cor.ouro} />
          <span style={{ fontFamily: 'Inter', fontSize: 12.5, color: cor.texto, fontWeight: 600 }}>Amanhã é sua vez de trazer o devocional!</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setAba('hoje')} style={{ flex: 1, padding: '9px 0', borderRadius: 8, border: `1.5px solid ${aba === 'hoje' ? cor.ouro : cor.borda}`, background: aba === 'hoje' ? 'rgba(227,178,60,0.10)' : 'transparent', color: cor.texto, fontFamily: 'Inter', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Hoje</button>
        <button onClick={abrirHistorico} style={{ flex: 1, padding: '9px 0', borderRadius: 8, border: `1.5px solid ${aba === 'historico' ? cor.ouro : cor.borda}`, background: aba === 'historico' ? 'rgba(227,178,60,0.10)' : 'transparent', color: cor.texto, fontFamily: 'Inter', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Histórico</button>
      </div>

      {aba === 'historico' ? (
        carregandoHistorico ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Loader2 className="spin" size={20} color={cor.ouro} /></div>
        ) : !historico || historico.length === 0 ? (
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo, textAlign: 'center', padding: '20px 0' }}>Ainda não há devocionais anteriores registrados.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {historico.map((h) => {
              const autor = membros.find((m) => m.id === h.membroId);
              const totalReacoes = Object.values(h.reacoes || {}).reduce((s, arr) => s + arr.length, 0);
              const textoH = h.texto ?? (h.tipo === 'texto' ? h.conteudo : null);
              const audioH = h.audio ?? (h.tipo === 'audio' ? h.conteudo : null);
              return (
                <div key={h.data} style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Avatar nome={h.nome || '?'} foto={autor?.foto} tamanho={32} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: cor.texto }}>{h.nome || 'Alguém do grupo'}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: 11, color: cor.mudo }}>{formatarDataCurta(h.data)}</div>
                    </div>
                    {textoH && <FileText size={13} color={cor.mudo} />}
                    {audioH && <Mic size={13} color={cor.mudo} />}
                    {(souLider || (meuNome && h.nome && h.nome.trim().toLowerCase() === meuNome.trim().toLowerCase())) && (
                      <button onClick={() => excluirDoHistorico(h.data)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}>
                        <Trash2 size={13} color={cor.mudo} />
                      </button>
                    )}
                  </div>
                  {textoH && (
                    <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo, margin: audioH ? '0 0 10px' : '0 0 4px', lineHeight: 1.5 }}>
                      {textoH.length > 140 ? `${textoH.slice(0, 140)}…` : textoH}
                    </p>
                  )}
                  {audioH && <audio controls src={audioH} style={{ width: '100%', marginBottom: 4 }} />}
                  {totalReacoes > 0 && <BarraReacoes reacoes={h.reacoes} meuNome={meuNome} somenteLeitura />}
                  <Comentarios comentarios={h.comentarios} meuNome={meuNome} onComentar={(texto) => comentarHistorico(h.data, texto)} />
                </div>
              );
            })}
          </div>
        )
      ) : !atribuicao ? (
        <div style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 16, padding: 24, textAlign: 'center' }}>
          <CalendarDays size={22} color={cor.mudo} style={{ marginBottom: 8 }} />
          <p style={{ fontFamily: 'Inter', fontSize: 13.5, color: cor.mudo, margin: 0 }}>Ninguém está escalado para hoje. Combine na aba "Escala".</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <Avatar nome={atribuicao.nome} foto={membro?.foto} tamanho={56} />
            <div>
              <div style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 16.5, color: cor.texto }}>{atribuicao.nome}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 12.5, color: cor.mudo }}>{hoje.getDate()} de {MESES[hoje.getMonth()].toLowerCase()}</div>
            </div>
          </div>

          {devocional ? (
            <div style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 16, padding: 18 }}>
              <ConteudoDevocional devocional={devocional} />
              <BarraReacoes reacoes={devocional.reacoes} meuNome={meuNome} onReagir={reagir} />
              <Comentarios comentarios={devocional.comentarios} meuNome={meuNome} onComentar={comentar} />
            </div>
          ) : souEu ? (
            <div style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 16, padding: 18 }}>
              <p style={{ fontFamily: 'Inter', fontSize: 13.5, color: cor.texto, fontWeight: 600, margin: '0 0 12px' }}>Hoje é sua vez — publique o devocional</p>

              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escreva aqui o devocional de hoje (opcional se for gravar áudio)..."
                rows={5}
                style={{ width: '100%', padding: 12, borderRadius: 10, border: `1px solid ${cor.borda}`, background: cor.bg, color: cor.texto, fontFamily: 'Inter', fontSize: 14, outline: 'none', resize: 'vertical', marginBottom: 12 }}
              />

              {audioAnexado ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <audio controls src={audioAnexado} style={{ flex: 1 }} />
                  <button onClick={() => setAudioAnexado(null)} style={{ background: cor.painelAlt, border: `1px solid ${cor.borda}`, borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                    <X size={13} color={cor.mudo} />
                  </button>
                </div>
              ) : gravando ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '18px 12px', borderRadius: 10, border: `1.5px solid ${cor.erro}`, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: cor.erro, animation: 'pulsar 1.2s ease-in-out infinite' }} />
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 14, color: cor.texto, fontWeight: 700 }}>{formatarTempo(tempoGravado)}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 11.5, color: cor.mudo }}>/ 2:00</span>
                  </div>
                  <button onClick={pararGravacao} style={{ display: 'flex', alignItems: 'center', gap: 6, background: cor.erro, border: 'none', borderRadius: 999, padding: '8px 16px', cursor: 'pointer', color: '#fff', fontFamily: 'Inter', fontWeight: 700, fontSize: 12.5 }}>
                    Parar gravação
                  </button>
                </div>
              ) : (
                <button
                  onClick={iniciarGravacao}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, width: '100%', padding: '18px 12px', borderRadius: 10, border: `1.5px dashed ${cor.borda}`, cursor: 'pointer', marginBottom: 12, background: 'transparent' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(227,178,60,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                    <Mic size={18} color={cor.ouro} />
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 13, color: cor.texto, fontWeight: 600 }}>Toque pra gravar um áudio</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 11, color: cor.mudo, opacity: 0.7 }}>Máximo de 2 minutos</span>
                </button>
              )}

              {erro && <p style={{ color: cor.erro, fontFamily: 'Inter', fontSize: 12.5, margin: '0 0 10px' }}>{erro}</p>}
              <button onClick={publicar} disabled={enviando || gravando} style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: cor.ouro, color: '#161B33', fontFamily: 'Inter', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                {enviando ? 'Publicando…' : 'Publicar devocional'}
              </button>
            </div>
          ) : (
            <div style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 16, padding: 20, textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter', fontSize: 13.5, color: cor.mudo, margin: 0 }}>Aguardando o devocional de {atribuicao.nome}…</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   ABA: RANKING
--------------------------------------------------------- */
function LinhaRanking({ posicao, nome, pontos, sufixo, membro, onAbrirPerfil }) {
  return (
    <button
      onClick={() => membro && onAbrirPerfil(membro)}
      style={{ display: 'flex', alignItems: 'center', gap: 11, background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 12, padding: '10px 13px', cursor: membro ? 'pointer' : 'default', textAlign: 'left', width: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 30, flexShrink: 0 }}>
        <Award size={13} color={cor.mudo} />
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12.5, color: cor.mudo, fontWeight: 700 }}>{posicao}</span>
      </div>
      <Avatar nome={nome} foto={membro?.foto} tamanho={34} />
      <span style={{ flex: 1, fontFamily: 'Inter', fontSize: 14, color: cor.texto, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nome}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: cor.painelAlt, borderRadius: 999, padding: '5px 10px', flexShrink: 0 }}>
        <Gem size={12} color={cor.ouro} />
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12.5, color: cor.texto, fontWeight: 700 }}>{pontos}{sufixo}</span>
      </div>
    </button>
  );
}

function Podio3D({ lista, sufixo, membros, onAbrirPerfil }) {
  if (lista.length === 0) {
    return <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo, textAlign: 'center', padding: '20px 0' }}>Ainda sem respostas registradas este mês.</p>;
  }
  const buscarMembro = (n) => membros.find((m) => m.nome.trim().toLowerCase() === n.trim().toLowerCase());
  const [p1, p2, p3] = lista;
  const colunas = [
    p2 && { par: p2, ordem: 2, altura: 88, corTopo: '#9CC0EE', corBase: '#5F8FD0' },
    p1 && { par: p1, ordem: 1, altura: 130, corTopo: cor.ouroSuave, corBase: cor.ouro },
    p3 && { par: p3, ordem: 3, altura: 66, corTopo: '#F0B58C', corBase: '#D97F4E' },
  ].filter(Boolean);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, padding: '4px 4px 0' }}>
      {colunas.map((col) => {
        const [nome, pontos] = col.par;
        const membro = buscarMembro(nome);
        return (
          <button
            key={col.ordem}
            onClick={() => membro && onAbrirPerfil(membro)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, background: 'transparent', border: 'none', cursor: membro ? 'pointer' : 'default', padding: 0 }}
          >
            {col.ordem === 1 && <Crown size={18} color={cor.ouro} style={{ marginBottom: 4 }} />}
            <div style={{ borderRadius: '50%', boxShadow: col.ordem === 1 ? '0 0 16px rgba(227,178,60,0.5)' : 'none' }}>
              <Avatar nome={nome} foto={membro?.foto} tamanho={col.ordem === 1 ? 52 : 42} />
            </div>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12.5, color: cor.texto, marginTop: 8, textAlign: 'center', maxWidth: 84, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nome}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3, marginBottom: 8 }}>
              <Gem size={11} color={cor.ouro} />
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11.5, color: cor.mudo, fontWeight: 700 }}>{pontos}{sufixo}</span>
            </div>
            <div style={{
              width: '100%', height: col.altura, borderRadius: '14px 14px 4px 4px',
              background: `linear-gradient(180deg, ${col.corTopo}, ${col.corBase})`,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10,
              boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
            }}>
              <span style={{ fontFamily: 'Fraunces', fontWeight: 700, fontSize: 22, color: 'rgba(255,255,255,0.9)' }}>{col.ordem}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function SecaoRanking({ titulo, icone, lista, sufixo, membros, onAbrirPerfil, comPodio }) {
  const pontos3 = comPodio ? lista.slice(0, 3) : [];
  const resto = comPodio ? lista.slice(3) : lista;
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        {icone}
        <h3 style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 16.5, color: cor.texto, margin: 0 }}>{titulo}</h3>
      </div>

      {comPodio && (
        <div style={{ background: cor.painel, border: `1px solid ${cor.borda}`, borderRadius: 18, padding: '16px 12px 14px', marginBottom: resto.length ? 10 : 0 }}>
          <Podio3D lista={pontos3} sufixo={sufixo} membros={membros} onAbrirPerfil={onAbrirPerfil} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 12, opacity: 0.7 }}>
            <RefreshCw size={11} color={cor.mudo} />
            <span style={{ fontFamily: 'Inter', fontSize: 10.5, color: cor.mudo }}>atualiza sempre que alguém responde o quiz</span>
          </div>
        </div>
      )}

      {lista.length === 0 && !comPodio ? (
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: cor.mudo, margin: 0 }}>Ainda sem respostas registradas.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {resto.map(([n, pts], i) => (
            <LinhaRanking
              key={n}
              posicao={comPodio ? i + 4 : i + 1}
              nome={n}
              pontos={pts}
              sufixo={sufixo}
              membro={membros.find((m) => m.nome.trim().toLowerCase() === n.trim().toLowerCase())}
              onAbrirPerfil={onAbrirPerfil}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AbaRanking({ membros, onAbrirPerfil }) {
  const [carregando, setCarregando] = useState(true);
  const [hojeMapa, setHojeMapa] = useState({});
  const [semanaMapa, setSemanaMapa] = useState({});
  const [mesMapa, setMesMapa] = useState({});

  useEffect(() => {
    (async () => {
      const hoje = new Date();
      const did = dateId(hoje), wid = weekId(hoje), mid = monthId(hoje);
      const [rHoje, rSemana, rMes] = await Promise.allSettled([
        window.storage.get(`respostas:${did}`, true),
        window.storage.get(`semana:${wid}`, true),
        window.storage.get(`mes:${mid}`, true),
      ]);
      if (rHoje.status === 'fulfilled' && rHoje.value) {
        const obj = JSON.parse(rHoje.value.value);
        const simples = {};
        Object.entries(obj).forEach(([k, v]) => simples[k] = v.score);
        setHojeMapa(simples);
      }
      if (rSemana.status === 'fulfilled' && rSemana.value) {
        const dados = JSON.parse(rSemana.value.value);
        setSemanaMapa(dados.pontos || {});
      }
      if (rMes.status === 'fulfilled' && rMes.value) {
        setMesMapa(JSON.parse(rMes.value.value));
      }
      setCarregando(false);
    })();
  }, []);

  if (carregando) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Loader2 size={22} color={cor.ouro} /></div>;

  const listaMes = Object.entries(mesMapa).sort((a, b) => b[1] - a[1]);
  const listaSemana = Object.entries(semanaMapa).sort((a, b) => b[1] - a[1]);
  const listaHoje = Object.entries(hojeMapa).sort((a, b) => b[1] - a[1]);
  const campeao = listaMes[0];

  const hoje = new Date();
  const nomesMeses = MESES[hoje.getMonth()];

  return (
    <div style={{ padding: '4px 18px 100px' }}>
      <div style={{ margin: '14px 0 20px' }}>
        <h2 style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 21, color: cor.texto, margin: 0 }}>Ranking</h2>
        <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: cor.mudo, margin: '2px 0 0' }}>{nomesMeses} de {hoje.getFullYear()}</p>
      </div>

      <SecaoRanking titulo="Este mês" icone={<Crown size={16} color={cor.ouro} />} lista={listaMes} sufixo=" pts" membros={membros} onAbrirPerfil={onAbrirPerfil} comPodio />
      <SecaoRanking titulo="Esta semana" icone={<Trophy size={16} color={cor.ouro} />} lista={listaSemana} sufixo=" pts" membros={membros} onAbrirPerfil={onAbrirPerfil} />
      <SecaoRanking titulo="Hoje" icone={<Flame size={16} color={cor.ouro} />} lista={listaHoje} sufixo="/5" membros={membros} onAbrirPerfil={onAbrirPerfil} />

      {campeao && (
        <button
          onClick={() => compartilhar('Ranking Lâmpada', `🏆 ${campeao[0]} está na liderança do ranking do mês na Lâmpada, com ${campeao[1]} pontos!`)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, border: `1.5px solid ${cor.borda}`, background: 'transparent', color: cor.texto, fontFamily: 'Inter', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', marginTop: 4 }}
        >
          <Share2 size={14} /> Compartilhar ranking do mês
        </button>
      )}
    </div>
  );
}

function EstatCard({ valor, label }) {
  return (
    <div style={{ background: cor.painelAlt, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 18, color: cor.ouro }}>{valor}</div>
      <div style={{ fontFamily: 'Inter', fontSize: 10, color: cor.mudo, marginTop: 2, lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

function PerfilMembro({ membro, onFechar }) {
  const [carregando, setCarregando] = useState(true);
  const [pontosMes, setPontosMes] = useState(0);
  const [diasEscalados, setDiasEscalados] = useState(0);
  const [sequencia, setSequencia] = useState(0);

  useEffect(() => {
    (async () => {
      setCarregando(true);
      const hoje = new Date();
      const mid = monthId(hoje);
      const wid = weekId(hoje);
      const [rMes, rEscala, rSemana] = await Promise.allSettled([
        window.storage.get(`mes:${mid}`, true),
        window.storage.get(`escala:${mid}`, true),
        window.storage.get(`semana:${wid}`, true),
      ]);
      setPontosMes(rMes.status === 'fulfilled' && rMes.value ? (JSON.parse(rMes.value.value)[membro.nome] || 0) : 0);
      setDiasEscalados(
        rEscala.status === 'fulfilled' && rEscala.value
          ? Object.values(JSON.parse(rEscala.value.value)).filter((v) => v.membroId === membro.id).length
          : 0
      );
      setSequencia(
        rSemana.status === 'fulfilled' && rSemana.value
          ? contarSequencia(JSON.parse(rSemana.value.value).trilha?.[membro.nome] || {})
          : 0
      );
      setCarregando(false);
    })();
  }, [membro.id, membro.nome]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onFechar}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, background: cor.painel, borderRadius: '24px 24px 0 0', padding: '12px 22px calc(24px + env(safe-area-inset-bottom))', maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <button onClick={onFechar} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ArrowLeft size={18} color={cor.mudo} />
          </button>
          <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 700, color: cor.mudo, textTransform: 'uppercase', letterSpacing: 0.5 }}>Perfil</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <Avatar nome={membro.nome} foto={membro.foto} tamanho={64} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 19, color: cor.texto }}>{membro.nome}</span>
              {membro.lider && <Crown size={14} color={cor.ouro} />}
            </div>
            {membro.aniversario && (
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: cor.mudo, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <Cake size={11} /> {membro.aniversario}
              </span>
            )}
          </div>
        </div>

        {carregando ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}><Loader2 className="spin" size={20} color={cor.ouro} /></div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <EstatCard valor={pontosMes} label="pontos no mês" />
            <EstatCard valor={sequencia} label="dias seguidos" />
            <EstatCard valor={diasEscalados} label="devocionais este mês" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   APP PRINCIPAL
--------------------------------------------------------- */
export default function App() {
  const [nome, setNome] = useState(null);
  const [carregandoNome, setCarregandoNome] = useState(true);
  const [aba, setAba] = useState('quiz');
  const [tema, setTema] = useState('escuro');
  const [mostrarSplash, setMostrarSplash] = useState(true);
  const [perfilAberto, setPerfilAberto] = useState(null);
  const [planejamentoAberto, setPlanejamentoAberto] = useState(false);

  const [membrosBase, setMembrosBase] = useState([]);
  const [fotos, setFotos] = useState({});
  const [carregandoFotoId, setCarregandoFotoId] = useState(null);

  const [avisoDevocionalPendente, setAvisoDevocionalPendente] = useState(false);
  const [avisosNaoVistos, setAvisosNaoVistos] = useState(false);

  // aplicado direto no corpo do render (não em useEffect) — assim os
  // componentes filhos já leem a cor certa nesta mesma passada, sem
  // precisar de outro re-render pra "pegar" a troca de tema.
  aplicarTema(tema);

  useEffect(() => {
    const t = setTimeout(() => setMostrarSplash(false), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get('meu-nome', false);
        if (r && r.value) setNome(r.value);
      } catch { /* sem nome salvo ainda */ }
      try {
        const r = await window.storage.get('meu-tema', false);
        if (r && r.value) setTema(r.value);
      } catch { /* sem preferência salva ainda */ }
      setCarregandoNome(false);
    })();
    (async () => {
      const [rMembros, rFotos] = await Promise.allSettled([
        window.storage.get('membros', true),
        window.storage.get('fotos', true),
      ]);
      setMembrosBase(rMembros.status === 'fulfilled' && rMembros.value ? JSON.parse(rMembros.value.value) : []);
      setFotos(rFotos.status === 'fulfilled' && rFotos.value ? JSON.parse(rFotos.value.value) : {});
    })();
  }, []);

  const membros = membrosBase.map((m) => ({ ...m, foto: fotos[m.id] }));

  // "presença" — avisa o grupo (visível só pros líderes) que esse nome está com o app aberto
  useEffect(() => {
    if (!nome) return;
    const atualizarPresenca = async () => {
      try {
        const r = await window.storage.get('presenca', true);
        const mapa = r ? JSON.parse(r.value) : {};
        mapa[nome] = Date.now();
        await window.storage.set('presenca', JSON.stringify(mapa), true);
      } catch {
        try { await window.storage.set('presenca', JSON.stringify({ [nome]: Date.now() }), true); } catch { /* ignora */ }
      }
    };
    atualizarPresenca();
    const intervalo = setInterval(atualizarPresenca, 30000);
    return () => clearInterval(intervalo);
  }, [nome]);

  // notificações locais (sem backend): calcula de novo sempre que troca de aba,
  // assim o alerta some na hora certa (ex: assim que a pessoa publica o devocional)
  useEffect(() => {
    if (!nome) return;
    (async () => {
      const hoje = new Date();
      const did = dateId(hoje);
      const mid = monthId(hoje);
      const [rEscala, rDevocional, rAvisos, rVistos] = await Promise.allSettled([
        window.storage.get(`escala:${mid}`, true),
        window.storage.get(`devocional:${did}`, true),
        window.storage.get(`avisos:${mid}`, true),
        window.storage.get('avisos-vistos', false),
      ]);

      const atribuicaoHoje = rEscala.status === 'fulfilled' && rEscala.value ? (JSON.parse(rEscala.value.value)[did] || null) : null;
      const devocionalExiste = rDevocional.status === 'fulfilled' && !!rDevocional.value;
      setAvisoDevocionalPendente(!!(
        atribuicaoHoje && atribuicaoHoje.nome.trim().toLowerCase() === nome.trim().toLowerCase() && !devocionalExiste
      ));

      const eventosMes = rAvisos.status === 'fulfilled' && rAvisos.value ? JSON.parse(rAvisos.value.value) : {};
      const idsDestaque = Object.values(eventosMes).flat().filter((e) => e.destaque).map((e) => e.id);
      let vistos = rVistos.status === 'fulfilled' && rVistos.value ? JSON.parse(rVistos.value.value) : [];

      if (aba === 'avisos' && idsDestaque.length > 0) {
        const faltantes = idsDestaque.filter((id) => !vistos.includes(id));
        if (faltantes.length > 0) {
          vistos = [...vistos, ...faltantes];
          try { await window.storage.set('avisos-vistos', JSON.stringify(vistos), false); } catch { /* tenta depois */ }
        }
        setAvisosNaoVistos(false);
      } else {
        setAvisosNaoVistos(idsDestaque.some((id) => !vistos.includes(id)));
      }
    })();
  }, [nome, aba]);

  const entrar = async (n) => {
    setNome(n);
    try { await window.storage.set('meu-nome', n, false); } catch { /* segue sem salvar */ }
  };

  const sair = async () => {
    setNome(null);
    try { await window.storage.delete('meu-nome', false); } catch { /* segue mesmo assim */ }
  };

  const alternarTema = () => {
    const novo = tema === 'escuro' ? 'claro' : 'escuro';
    setTema(novo);
    window.storage.set('meu-tema', novo, false).catch(() => {});
  };

  const adicionarMembro = async (nomeNovo, aniversarioNovo) => {
    const novo = { id: gerarId(), nome: nomeNovo, aniversario: aniversarioNovo || undefined };
    const lista = [...membrosBase, novo];
    setMembrosBase(lista);
    try { await window.storage.set('membros', JSON.stringify(lista), true); } catch { /* tenta depois */ }
  };

  const removerMembro = async (id) => {
    const lista = membrosBase.filter((m) => m.id !== id);
    setMembrosBase(lista);
    try { await window.storage.set('membros', JSON.stringify(lista), true); } catch { /* tenta depois */ }
  };

  const definirFoto = async (id, file) => {
    setCarregandoFotoId(id);
    try {
      const base64 = await redimensionarImagem(file);
      const novasFotos = { ...fotos, [id]: base64 };
      setFotos(novasFotos);
      await window.storage.set('fotos', JSON.stringify(novasFotos), true);
    } catch { /* ignora falha pontual */ }
    setCarregandoFotoId(null);
  };

  const alternarLider = async (id) => {
    const lista = membrosBase.map((m) => (m.id === id ? { ...m, lider: !m.lider } : m));
    setMembrosBase(lista);
    try { await window.storage.set('membros', JSON.stringify(lista), true); } catch { /* tenta depois */ }
  };

  const definirAniversario = async (id, valor) => {
    const lista = membrosBase.map((m) => (m.id === id ? { ...m, aniversario: valor || undefined } : m));
    setMembrosBase(lista);
    try { await window.storage.set('membros', JSON.stringify(lista), true); } catch { /* tenta depois */ }
  };

  const abas = [
    { id: 'quiz', label: 'Quiz', icone: BookOpen },
    { id: 'devocional', label: 'Devocional', icone: Mic },
    { id: 'escala', label: 'Escala', icone: CalendarDays },
    { id: 'avisos', label: 'Avisos', icone: Megaphone },
    { id: 'membros', label: 'Membros', icone: Users },
    { id: 'ranking', label: 'Ranking', icone: Trophy },
  ];

  if (mostrarSplash) {
    return (
      <div style={{ minHeight: '100vh', background: cor.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <style>{fontes}</style>
        <div className="logo-pulsa" style={{
          width: 68, height: 68, borderRadius: 20, background: `radial-gradient(circle, ${cor.ouroSuave}, ${cor.ouro})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(227,178,60,0.5)', marginBottom: 16,
        }}>
          <Flame size={30} color="#161B33" fill="#161B33" />
        </div>
        <span style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 20, color: cor.texto }}>Lâmpada</span>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: cor.bg, display: 'flex', justifyContent: 'center' }}>
      <style>{fontes}</style>
      <div style={{ width: '100%', maxWidth: 440, minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {carregandoNome ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Loader2 className="spin" size={22} color={cor.ouro} /></div>
        ) : !nome ? (
          <TelaNome onEntrar={entrar} membros={membros} onCadastrarMembro={adicionarMembro} />
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 18px 6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Flame size={18} color={cor.ouro} />
                <span style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: 17, color: cor.texto }}>Lâmpada</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {souLiderDe(membros, nome) && (
                  <button onClick={() => setPlanejamentoAberto(true)} title="Planejamento (líderes)" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
                    <CalendarClock size={16} color={cor.mudo} />
                  </button>
                )}
                <button onClick={alternarTema} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
                  {tema === 'escuro' ? <Sun size={16} color={cor.mudo} /> : <Moon size={16} color={cor.mudo} />}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter', fontSize: 12.5, color: cor.mudo }}>
                  <Users size={13} /> {nome}
                </div>
                <button
                  onClick={sair}
                  title="Sair"
                  style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: cor.mudo, fontFamily: 'Inter', fontSize: 12.5 }}
                >
                  <LogOut size={14} /> Sair
                </button>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              {aba === 'quiz' && <AbaQuiz nome={nome} />}
              {aba === 'escala' && <AbaEscala membros={membros} meuNome={nome} />}
              {aba === 'avisos' && <AbaAvisos membros={membros} meuNome={nome} />}
              {aba === 'devocional' && <AbaDevocional membros={membros} meuNome={nome} />}
              {aba === 'membros' && (
                <AbaMembros
                  membros={membros}
                  meuNome={nome}
                  adicionarMembro={adicionarMembro}
                  removerMembro={removerMembro}
                  definirFoto={definirFoto}
                  carregandoFotoId={carregandoFotoId}
                  alternarLider={alternarLider}
                  definirAniversario={definirAniversario}
                  onAbrirPerfil={setPerfilAberto}
                />
              )}
              {aba === 'ranking' && <AbaRanking membros={membros} onAbrirPerfil={setPerfilAberto} />}
            </div>

            <div style={{ position: 'sticky', bottom: 0, display: 'flex', background: cor.navBg, borderTop: `1px solid ${cor.borda}`, padding: '8px 4px calc(8px + env(safe-area-inset-bottom))' }}>
              {abas.map(({ id, label, icone: Icone }) => {
                const ativa = aba === id;
                const temBadge = (id === 'devocional' && avisoDevocionalPendente) || (id === 'avisos' && avisosNaoVistos);
                return (
                  <button
                    key={id}
                    onClick={() => setAba(id)}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 0', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <div style={{ position: 'relative' }}>
                      <Icone size={18} color={ativa ? cor.ouro : cor.mudo} strokeWidth={ativa ? 2.4 : 1.9} />
                      {temBadge && (
                        <span style={{ position: 'absolute', top: -2, right: -3, width: 8, height: 8, borderRadius: '50%', background: cor.erro, border: `1.5px solid ${cor.bg}` }} />
                      )}
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: 9.5, fontWeight: ativa ? 700 : 500, color: ativa ? cor.ouro : cor.mudo }}>{label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
      {perfilAberto && <PerfilMembro membro={perfilAberto} onFechar={() => setPerfilAberto(null)} />}
      {planejamentoAberto && <PainelPlanejamento membros={membros} meuNome={nome} onFechar={() => setPlanejamentoAberto(false)} />}
    </div>
  );
}


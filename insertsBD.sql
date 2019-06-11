use trivia_dev;
-- Carga Usuarios
INSERT INTO users (username, dni, administrator, password)
VALUES ('Hernan', '39546109', true, 'root');

INSERT INTO users (username, dni, administrator, password)
VALUES ('Yani', '41824212', true, 'root');

INSERT INTO users (username, dni, administrator, password)
VALUES ('Pablo', '39246109', true, 'root');

-- NUEVAS Categorias
INSERT INTO categories (category_name)
VALUES ('Geografia');

INSERT INTO categories (category_name)
VALUES ('Ciencia');

INSERT INTO categories (category_name)
VALUES ('Arte');

INSERT INTO categories (category_name)
VALUES ('Entretenimiento');

INSERT INTO categories (category_name)
VALUES ('Historia');

INSERT INTO categories (category_name)
VALUES ('Deporte');

-- Preguntas NUEVAS Geometria y opciones
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Cual es el pais menos turistico de Europa?', '1', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Armenia', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Moldavia', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Liechtenstein', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Hungria', '1', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('A que pais pertenece la isla de Tasmania?', '1', '1', true);
--  Carga Opciones
INSERT INTO options (description, question_id, correct)
VALUES (' Estados Unidos', '2', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Australia', '2', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Portugal', '2', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ninguna es correcta', '2', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('En cual de los siguientes paises NO hay ningun desierto?', '1', '1', true);
--  Carga Opciones
INSERT INTO options (description, question_id, correct)
VALUES ('Espana', '3', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Chile', '3', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Mongolia', '3', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Alemania', '3', true);

INSERT INTO questions (description, category_id, user_id, active)
VALUES (' Cual es el codigo internacional para Cuba?', '1', '1', true);
--  Carga Opciones
INSERT INTO options (description, question_id, correct)
VALUES ('CA', '4', false);
INSERT INTO options (description, question_id, correct)
VALUES ('CU', '4', true);
INSERT INTO options (description, question_id, correct)
VALUES ('CB', '4', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ninguna', '4', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Cual es la capital del estado de Arkansas?', '1', '1', true);
--  Carga Opciones
INSERT INTO options (description, question_id, correct)
VALUES ('Kansas', '5', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Little Rock', '5', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Hot Springs', '5', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Washington', '5', false);

-- Preguntas NUEVAS Ciencia
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Cual de las sisguientes enfermedades ataca al higado?', '2', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Hepatitis', '6', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Diabetes', '6', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Astrosis', '6', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Cifoescoliosis', '6', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Como tomarias la sustancia alucinogena natural llamada ayahuasca?', '2', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('inhalada', '7', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Esnifada', '7', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Inyectada', '7', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ingerida', '7', true);

INSERT INTO questions (description, category_id, user_id, active)
VALUES (' Cual es la funcion principal del instestino grueso?', '2', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('La absorcion de nutrientes', '8', false);
INSERT INTO options (description, question_id, correct)
VALUES ('La digestion mecanica de los alimentos', '8', false);
INSERT INTO options (description, question_id, correct)
VALUES ('La absorcion del agua', '8', true);
INSERT INTO options (description, question_id, correct)
VALUES ('La digestion quimica de los alimentos', '8', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES (' Que hay en la boca del estomago? ', '2', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('El piloro', '9', false);
INSERT INTO options (description, question_id, correct)
VALUES ('El cardias', '9', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Los acidos gastricos', '9', false);
INSERT INTO options (description, question_id, correct)
VALUES ('El epilon mayor', '9', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Que cambio de estado ocurre en la sublimacion?', '2', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('De solido a liquido', '10', false);
INSERT INTO options (description, question_id, correct)
VALUES ('De solido a gaseoso', '10', true);
INSERT INTO options (description, question_id, correct)
VALUES ('De gaseoso a liquido', '10', false);
INSERT INTO options (description, question_id, correct)
VALUES ('De liquido a solido', '10', false);

-- Preguntas NUEVAS Arte
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Cual era la nacionalidad de Heri Cartier-Bresson padre del fotoreportaje? ', '3', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Britanica', '11', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Espanola', '11', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Alemana', '11', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Francesa', '11', true);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Quien pinto el cuado "El jardin de las delicias"?', '3', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('El Bosco', '12', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Carvaggio', '12', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Velazquez', '12', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Arcimboldo', '12', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Que ciudades describe Italo Calvino en "Las ciudades invisibles"?', '3', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Ciudades asiaticas', '13', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Las que Marco Polo visito en sus viajes', '13', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ciudades europeas', '13', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ciudades imaginadas por Marco Polo', '13', true);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Cual es la ciudad fetiche del escritor Paul Auster?', '3', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Nueva York', '14', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Londres', '14', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Paris', '14', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Chicago', '14', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES (' Quien escribio "El viejo y el mar?', '3', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Ernest Hemingway', '15', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Norman Mailer', '15', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Gabriel Garcia Marquez', '15', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Truman Capote', '15', false);

-- Preguntas NUEVAS Entretenimiento
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Que premiada serie de television tiene como protagonista a un publicista?', '4', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Mad Men', '16', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Shameless', '16', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Juego de Tronos', '16', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Downton Abbey', '16', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Como se llamaba la protagonista femenina de la serie de television "Scrubs"?', '4', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Elliot', '17', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Sarah', '17', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Jordan', '17', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Molly', '17', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Como se llamaba el personaje que interpretaba John Travolta en "Grease"? ', '4', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Danny Puno', '18', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Danny Zuko', '18', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Danny Grease', '18', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Danny Chulo', '18', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('En que anio se estreno la pelicula de Disney "Pinocho"? ', '4', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES (' 1740', '19', true);
INSERT INTO options (description, question_id, correct)
VALUES ('1750', '19', false);
INSERT INTO options (description, question_id, correct)
VALUES ('1752', '19', false);
INSERT INTO options (description, question_id, correct)
VALUES ('1746', '19', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('En que pais nacio la Bauhaus? ', '4', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES (' Alemania', '20', true);
INSERT INTO options (description, question_id, correct)
VALUES ('holanda', '20', false);
INSERT INTO options (description, question_id, correct)
VALUES ('rusia', '20', false);
INSERT INTO options (description, question_id, correct)
VALUES ('estados Unidos', '20', false);

-- Preguntas NUEVAS Historia
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Cual es la rama mayoritaria del Islam? ', '5', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Chiismo Nicolas', '21', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Sunismo', '21', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Jariyismo', '21', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Sufismo', '21', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('De que fue ministro Manuel Fraga durante el franquismo?', '5', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('De Interior', '22', false);
INSERT INTO options (description, question_id, correct)
VALUES ('De Economia', '22', false);
INSERT INTO options (description, question_id, correct)
VALUES ('De Informacion y Turismo', '22', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Del Ejercito', '22', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('En que anio tuvo lugar el ataque a Pearl Harbor?', '5', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('1739', '23', false);
INSERT INTO options (description, question_id, correct)
VALUES ('1740', '23', false);
INSERT INTO options (description, question_id, correct)
VALUES ('1741', '23', true);
INSERT INTO options (description, question_id, correct)
VALUES ('1742', '23', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Las revueltas de donde son llamadas Intifadas?', '5', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Montenegro', '24', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Kosovo', '24', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Palestina', '24', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Chechenia', '24', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('La Comuna de Paris fue un movimiento...', '5', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Del mayo de 68', '25', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Hippie de los anios 60', '25', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Insurrecional autogestionario del XIX', '25', true);
INSERT INTO options (description, question_id, correct)
VALUES ('De la revolucion francesa', '25', false);

-- Preguntas NUEVAS Deporte
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('De que deporte es el kemari uno de los principales antecesores?', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Futbol', '26', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Tenis', '26', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Rugby', '26', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Karate', '26', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Cual es el clasico rival del Flamengo (BRA)?', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Corinthians', '27', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Palmeiras', '27', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Cruzeiro', '27', false);
INSERT INTO options (description, question_id, correct)
VALUES ('São Paulo', '27', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Cuantos mangos por lado tiene el futbolin?', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Luciana Aymar', '28', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Natascha Keller', '28', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Alyson Annan', '28', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Maartje Paumen', '28', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Cuantas finales del mundo jugo la Seleccion Argentina de futbol?', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Cinco', '29', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Seis', '29', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Cuatro', '29', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Tres', '29', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('Quien marco el gol 3.500 en Liga del Atletico de Madrid?', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Christian Vieri', '30', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Zinedine Zidane', '30', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Luka Modric', '30', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Adrian Escudero', '30', false);

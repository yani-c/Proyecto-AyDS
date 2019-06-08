use trivia_dev;
-- Carga Usuarios
INSERT INTO users (username, dni, administrator, password)
VALUES ('Hernan', '39546109', true, 'root');

INSERT INTO users (username, dni, administrator, password)
VALUES ('Yani', '42024232', true, 'root');

INSERT INTO users (username, dni, administrator, password)
VALUES ('Pablo', '39246109', true, 'root');
-- Carga Categorias
INSERT INTO categories (category_name)
VALUES ('Biologia');

INSERT INTO categories (category_name)
VALUES ('Quimica');

INSERT INTO categories (category_name)
VALUES ('Psicologia');

INSERT INTO categories (category_name)
VALUES ('Veterinaria');
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

-- Carga Pregunta
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cual de estas es una cancion de One Direction?', '1', '1', true);
--  Carga Opciones 1ra Pregunta
INSERT INTO options (description, question_id, correct)
VALUES ('Easier', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Amnesia', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Home', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Flicker', '1', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Como se llama el gato que persigue al raton?', '2', '1', true);
-- Carga Opciones 2da Pregunta
INSERT INTO options (description, question_id, correct)
VALUES ('Jerry', '2', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Tom', '2', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Donald', '2', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Pluto', '2', false);

-- Preguntas NUEVAS Geometria y opciones
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cuál es el país menos turístico de Europa?', '5', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Armenia', '3', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Moldavia', '3', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Liechtenstein', '3', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Hungria', '3', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿A qué país pertenece la isla de Tasmania?', '5', '1', true);
--  Carga Opciones
INSERT INTO options (description, question_id, correct)
VALUES (' Estados Unidos', '4', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Australia', '4', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Portugal', '4', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ninguna es correcta', '4', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿En cuál de los siguientes países NO hay ningún desierto?', '5', '1', true);
--  Carga Opciones
INSERT INTO options (description, question_id, correct)
VALUES ('España', '5', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Chile', '5', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Mongolia', '5', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Alemania', '5', true);

INSERT INTO questions (description, category_id, user_id, active)
VALUES (' ¿Cuál es el código internacional para Cuba?', '5', '1', true);
--  Carga Opciones
INSERT INTO options (description, question_id, correct)
VALUES ('CA', '6', false);
INSERT INTO options (description, question_id, correct)
VALUES ('CU', '6', true);
INSERT INTO options (description, question_id, correct)
VALUES ('CB', '6', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ninguna', '6', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cuál es la capital del estado de Arkansas?', '5', '1', true);
--  Carga Opciones
INSERT INTO options (description, question_id, correct)
VALUES ('Kansas', '7', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Little Rock', '7', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Hot Springs', '7', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Washington', '7', false);

-- Preguntas NUEVAS Ciencia
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cuál de las sisguientes enfermedades ataca al higado?', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Hepatitis', '8', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Diabetes', '8', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Astrosis', '8', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Cifoescoliosis', '8', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cómo tomarías la sustancia alucinógena natural llamada ayahuasca?', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('inhalada', '9', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Esnifada', '9', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Inyectada', '9', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ingerida', '9', true);

INSERT INTO questions (description, category_id, user_id, active)
VALUES (' ¿Cuál es la función principal del instestino grueso?', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('La absorcion de nutrientes', '10', false);
INSERT INTO options (description, question_id, correct)
VALUES ('La digestion mecanica de los alimentos', '10', false);
INSERT INTO options (description, question_id, correct)
VALUES ('La absorcion del agua', '10', true);
INSERT INTO options (description, question_id, correct)
VALUES ('La digestion quimica de los alimentos', '10', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES (' ¿Qué hay en la boca del estómago? ', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('El píloro', '11', false);
INSERT INTO options (description, question_id, correct)
VALUES ('El cardias', '11', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Los ácidos gástricos', '11', false);
INSERT INTO options (description, question_id, correct)
VALUES ('El epilón mayor', '11', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Qué cambio de estado ocurre en la sublimación?', '6', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('De sólido a líquido', '12', false);
INSERT INTO options (description, question_id, correct)
VALUES ('De sólido a gaseoso', '12', true);
INSERT INTO options (description, question_id, correct)
VALUES ('De gaseoso a líquido', '12', false);
INSERT INTO options (description, question_id, correct)
VALUES ('De líquido a solido', '12', false);

-- Preguntas NUEVAS Arte
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cuál era la nacionalidad de Heri Cartier-Bresson padre del fotoreportaje? ', '7', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Británica', '13', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Española', '13', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Alemana', '13', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Francesa', '13', true);

INSERT INTO questions (description, category_id, user_id, active)
VALUES (' ¿Quién pintó el cuado "El jardín de las delicias"?', '7', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('El Bosco', '14', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Carvaggio', '14', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Velázquez', '14', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Arcimboldo', '14', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Qué ciudades describe Italo Calvino en "Las ciudades invisibles"?', '7', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Ciudades asiáticas', '15', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Las que Marco Polo visitó en sus viajes', '15', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ciudades europeas', '15', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ciudades imaginadas por Marco Polo', '15', true);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cuál es la ciudad fetiche del escritor Paul Auster?', '7', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Nueva York', '16', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Londres', '16', false);
INSERT INTO options (description, question_id, correct)
VALUES ('París', '16', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Chicago', '16', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES (' ¿Quién escribió "El viejo y el mar?', '7', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Ernest Hemingway', '17', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Norman Mailer', '17', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Gabriel García Márquez', '17', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Truman Capote', '17', false);

-- Preguntas NUEVAS Entretenimiento
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Qué premiada serie de televisión tiene como protagonista a un publicista?', '8', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Mad Men', '18', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Shameless', '18', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Juego de Tronos', '18', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Downton Abbey', '18', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Como se llamaba la protagonista femenina de la serie de televisión "Scrubs"?', '8', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Elliot', '19', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Sarah', '19', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Jordan', '19', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Molly', '19', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cómo se llamaba el personaje que interpretaba John Travolta en "Grease"? ', '8', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Danny Puño', '20', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Danny Zuko', '20', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Danny Grease', '20', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Danny Chulo', '20', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿En qué año se estrenó la película de Disney "Pinocho"? ', '8', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES (' 1940', '21', true);
INSERT INTO options (description, question_id, correct)
VALUES ('1950', '21', false);
INSERT INTO options (description, question_id, correct)
VALUES ('1952', '21', false);
INSERT INTO options (description, question_id, correct)
VALUES ('1946', '21', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿En qué país nació la Bauhaus? ', '8', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES (' Alemania', '22', true);
INSERT INTO options (description, question_id, correct)
VALUES ('holanda', '22', false);
INSERT INTO options (description, question_id, correct)
VALUES ('rusia', '22', false);
INSERT INTO options (description, question_id, correct)
VALUES ('estados Unidos', '22', false);

-- Preguntas NUEVAS Historia
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cuál es la rama mayoritaria del Islam? ', '9', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Chiísmo Nicolás', '23', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Sunismo', '23', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Jariyismo', '23', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Sufismo', '23', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿De qué fue ministro Manuel Fraga durante el franquismo?', '9', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('De Interior', '24', false);
INSERT INTO options (description, question_id, correct)
VALUES ('De Economía', '24', false);
INSERT INTO options (description, question_id, correct)
VALUES ('De Información y Turismo', '24', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Del Ejército', '24', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿En qué año tuvo lugar el ataque a Pearl Harbor?', '9', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('1939', '25', false);
INSERT INTO options (description, question_id, correct)
VALUES ('1940', '25', false);
INSERT INTO options (description, question_id, correct)
VALUES ('1941', '25', true);
INSERT INTO options (description, question_id, correct)
VALUES ('1942', '25', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Las revueltas de dónde son llamadas Intifadas?', '9', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Montenegro', '26', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Kosovo', '26', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Palestina', '26', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Chechenia', '26', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('La Comuna de París fue un movimiento...', '9', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Del mayo de 68', '27', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Hippie de los años 60', '27', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Insurrecional autogestionario del XIX', '27', true);
INSERT INTO options (description, question_id, correct)
VALUES ('De la revolución francesa', '27', false);

-- Preguntas NUEVAS Deporte
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿De que deporte es el kemari uno de los principales antecesores?', '10', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Fútbol', '28', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Ténis', '28', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Rugby', '28', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Karate', '28', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cuál es el clásico rival del Flamengo (BRA)?', '10', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Corinthians', '29', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Palmeiras', '29', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Cruzeiro', '29', false);
INSERT INTO options (description, question_id, correct)
VALUES ('São Paulo', '29', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cuántos mangos por lado tiene el futbolín?', '10', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Luciana Aymar', '30', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Natascha Keller', '30', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Alyson Annan', '30', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Maartje Paumen', '30', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cuántas finales del mundo jugó la Selección Argentina de fútbol?', '10', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Cinco', '31', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Seis', '31', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Cuatro', '31', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Tres', '31', false);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Quién marcó el gol 3.500 en Liga del Atlético de Madrid?', '10', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Christian Vieri', '32', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Zinedine Zidane', '32', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Luka Modric', '32', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Adrián Escudero', '32', false);

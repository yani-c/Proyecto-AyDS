use trivia_dev;
-- Carga Usuarios
INSERT INTO users (name, dni, administrator, password)
VALUES ('Hernan', '39546109', true, 'root');

INSERT INTO users (name, dni, administrator, password)
VALUES ('Yani', '42024232', true, 'root');

INSERT INTO users (name, dni, administrator, password)
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
-- Carga Pregunta
INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Cual de estas es una cancion de One Direction?', '1', '1', true);

INSERT INTO questions (description, category_id, user_id, active)
VALUES ('¿Como se llama el gato que persigue al raton?', '2', '1', true);
--  Carga Opciones 1ra Pregunta
INSERT INTO options (description, question_id, correct)
VALUES ('Easier', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Amnesia', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Home', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Flicker', '1', false);
-- Carga Opciones 2da Pregunta
INSERT INTO options (description, question_id, correct)
VALUES ('Jerry', '2', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Tom', '2', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Donald', '2', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Pluto', '2', false);


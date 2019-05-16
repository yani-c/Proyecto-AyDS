use trivia_dev;
-- Carga Usuarios
INSERT INTO users (name, dni, administrator, password)
VALUES ('Hernan', '39546109', true, 'root');

INSERT INTO users (name, dni, administrator, password)
VALUES ('Yani', '42024232', true, 'root');

INSERT INTO users (name, dni, administrator, password)
VALUES ('Pablo', '39246109', true, 'root');
-- Carga Categorias
INSERT INTO categories (id, category_name)
VALUES ('0', 'Biologia');

INSERT INTO categories (id, category_name)
VALUES ('0','Quimica');

INSERT INTO categories (id, category_name)
VALUES ('0','Psicologia');

INSERT INTO categories (id, category_name)
VALUES ('0','Veterinaria');
-- Carga Pregunta
INSERT INTO questions (id, description, category_id, user_id, active)
VALUES ('0', 'P1', '1', '1', true);

INSERT INTO questions (id, description, category_id, user_id, active)
VALUES ('0', 'P2', '2', '1', true);
--  Carga Opciones 1ra Pregunta
INSERT INTO options (id, description, question_id, correct)
VALUES ('0', 'Op1', '1', true);
INSERT INTO options (id, description, question_id, correct)
VALUES ('0', 'Op2', '1', true);
INSERT INTO options (id, description, question_id, correct)
VALUES ('0', 'Op3', '1', true);
INSERT INTO options (id, description, question_id, correct)
VALUES ('0', 'Op4', '1', true);
-- Carga Opciones 2da Pregunta
INSERT INTO options (id, description, question_id, correct)
VALUES ('0', 'Op1', '2', true);
INSERT INTO options (id, description, question_id, correct)
VALUES ('0', 'Op1', '2', true);
INSERT INTO options (id, description, question_id, correct)
VALUES ('0', 'Op1', '2', true);
INSERT INTO options (id, description, question_id, correct)
VALUES ('0', 'Op1', '2', true);


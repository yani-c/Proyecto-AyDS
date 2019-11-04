use trivia_dev;
-- Carga Usuarios
INSERT INTO users (username, dni, administrator, password)
VALUES ('Hernan', '39546109', true, 'root');

INSERT INTO users (username, dni, administrator, password)
VALUES ('Yani', '41483046', true, 'root');

INSERT INTO users (username, dni, administrator, password)
VALUES ('Alvaro', '37875800', true, 'root');

-- NUEVAS Categorias
INSERT INTO categories (category_name,correct,incorrect)
VALUES ('Examen clínico',0,0);

INSERT INTO categories (category_name,correct,incorrect)
VALUES ('Farmacología y Terapéutica',0,0);

INSERT INTO categories (category_name,correct,incorrect)
VALUES ('Enfermedades Infecciosas y Parasitarias',0,0);

INSERT INTO categories (category_name,correct,incorrect)
VALUES ('Clínica Médica',0,0);

INSERT INTO categories (category_name,correct,incorrect)
VALUES ('Clínica Quirúrgica',0,0);

INSERT INTO categories (category_name,correct,incorrect)
VALUES ('Manejo Poblacional',0,0);

-- Preguntas NUEVAS Examen clinico y opciones

-- Preguntas NUEVAS Farmacología y Terapéutica y opciones
INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La posología de Enrofloxacina es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('1,25 a 2,5 mg./Kg. cada 24 Hs. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('2,5 a 5 mg./Kg. cada 24 Hs. I.M.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('6 mg./Kg. cada 12 Hs. I.M', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('7,5 mg./Kg. cada 12 Hs. I.M.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La posología de Danofloxacina es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('1,25 a 2,5 mg./Kg. cada 24 Hs. I.M. ', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('2,5 a 5 mg./Kg. cada 24 Hs. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg. cada 24 Hs. I.M', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('20 mg./Kg. cada 48 Hs. S.C.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La posología de Florfenicol es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg. cada 24 Hs. I.M. ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('20 mg./Kg. cada 48 Hs. I.M.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('20 mg./Kg. cada 72 Hs. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('40 mg./Kg. cada 48 Hs. S.C.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La posología de Oxitetraciclina L.A. es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('7 a 11 mg./Kg. cada 12 Hs. E.V.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg. cada 24 Hs. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('7,5 mg./Kg. cada 48 Hs. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('20 mg./Kg. cada 72 hs. I.M.', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La posología de Clorhidrato de Oxitetraciclina es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('20 mg./Kg. cada 72 Hs. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('7 a 11 mg./Kg. cada 8 a 12 Hs. E.V', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('20 mg./Kg. cada 24 Hs. I.M', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('15 mg./Kg. cada 48 Hs. S.C.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La posología de Amoxicilina es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('6 mg./Kg. cada 24 Hs. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg. cada 24 Hs.I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('15 mg./Kg. cada 48 Hs. I.M', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('a y c son correctas', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis y vía de Adm. de Tilmicosina para Ap. Respiratorio es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg. S.C.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('5 mg./Kg. S.C.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('20 mg./Kg. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('15 mg./kg. I.M.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES (' La dosis y vía de Adm. de Tilmicosina para Ojo o Pie es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg.S.C.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('5 mg./Kg. S.C.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('15 mg./Kg. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('20 mg./Kg. I.M.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La posología de Enrofloxacina L.A. es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('2,5 mg./Kg. cada 48 Hs.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('5 mg./Kg. cada 48 Hs', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('7,5 mg./kg. cada 72 Hs.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg. cada 72 Hs.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La posología de Danofloxacina L.A. es:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('2,5 mg./Kg. cada 48 Hs.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('6 mg./Kg. cada 72 Hs. I.M.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('5 mg./Kg. cada 48 Hs. I.M. ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg. cada 72 Hs. I.M.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Para Colibacilosis está/n indicado/s:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Oxitetraciclina', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Enrofloxacina', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Danofloxacina ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Todas las opciones anteriores son correcta', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La/s Vía/s de Administración de las Penicilinas Naturales son:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Penicilina Sódica E.V. ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Penicilina Procaínica I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Penicilina Benzatínica I.M. ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Todas las opciones anteriores son correctas', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Para Salmonellosis está/n indicado/s:', '2', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Enrofloxacina. ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Danofloxacina', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Florfenicol', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Todas las opciones anteriores son correctas', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Para Metafilaxia de Ap. Respiratorio está/n indicado/s :','2','1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Oxitetraciclina L.A.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Tilmicosina', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Enrofloxacina L.A.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Todas las opciones anteriores son correctas', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Para infecciones oculares está/n indicado/s:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Oxitetraciclina ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Tilmicosina', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Gentamicina', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Todas las opciones anteriores son correctas', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis y vía de Pilocarpina es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('0,05 a 0,1 mg./Kg. I.M', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES (' 0,5 a 1 mg./Kg. S.C.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('2,5 a 5 mg./kg. E.V.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('2 a 4 mg./Kg. I.M.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis y vía de Neostigmina es:','2','1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('0,05 a 0,1 mg./Kg. I.M. ', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('0,5 a 1 mg./Kg. E.V', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('2 a 4 mg./Kg. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('1 a 2 mg./Kg. S.C.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis y vía de Atropina es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('0,4 mg./Kg. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,08 mg./Kg. S.C.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('2 mg./Kg. E.V.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,5 mg./Kg. S.C.', '1', false);	

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis y vía de Metescopolamina es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('0,5 mg./Kg. E.V.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,1 mg./Kg. I.M.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES (' 1 mg./Kg. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('2 mg./Kg.S.C.', '1', false);	

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis y vía de Butilescopolamina es:','2','1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('2 mg./Kg. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,2 mg./Kg. E.V.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('5 mg./Kg. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,5 mg./Kg. S.C.', '1', false);	

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis y vía de Butilescopolamina es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('0,04 mg./Kg. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,10 mg./Kg. E.V', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,015 mg./Kg. I.M.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('0,5 mg./Kg. E.V.', '1', false);	

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis y vía de Loperamida es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('1 mg./Kg. S.C.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,05 mg./Kg. I.M.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('0,20 mg./Kg. I.M.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,15 mg./kg. I.M.', '1', false);	

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES (' La dosis de Bicarbonato de Sodio por Vía Oral es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('5 a 10 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,5 a 1 gr./Kg. ', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('10 a 20 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('2 a 5 gr./Kg', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis Total, para un bovino adulto de Dihidroxi Antraquinino es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('2 a 4 gr.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('5 a 10 gr.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('10 a 30 gr.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('50 a 100 gr.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis de Sulfato de Magnesio pos Vía Oral es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('2,5 a 5 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,5 a 1 gr./Kg.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('5 a 10 mgr./Kg. ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('2 a 4 gr./Kg.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis del Albendazol para nematodos es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES (' 5 mg./Kg.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('15 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('20 mg./kg.', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis de Albendazol para larvas inhibidas de Ostertagia es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('5 mg./kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('7,5 mg./kg', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('12,5 mg./Kg', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis de Albendazol para Fasciola Hepática es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('5 mg./kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('7,5 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('10 mg./Kg..', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('12,5 mg./Kg.', '1', false);	

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La dosis de Ivermectina al 1% es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('0,10 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,20 mg./Kg.', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('0,315 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES (' 0.630 mg./Kg.', '1', false);	

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES (' La dosis de Ivermectina al 3,15% es:', '2','1',true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('0,10 mg./kg. ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,20 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0,315 mg./Kg.', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('0.630 mg./Kg.', '1', true);	

-- Preguntas NUEVAS Enfermedades Infecciosas y Parasitarias y opciones
INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Los signos clínicos de ostertagiasis pueden ser', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Diarrea', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Pérdida de peso', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Aborto', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES (' Las opciones a y b son correctas', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Haemonchus spp ejerce su acción patógena en:', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Abomaso', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Intestino delgado', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Intestino grueso', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Omaso', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La ostertagiasis se trata con:', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Fipronil', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Albendazol', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Fluazuron', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Toltrazuril', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Los signos clínicos de fascioliasis pueden ser:', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Ascitis', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Pérdida de peso', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Edema', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Todas las opciones anteriores son correctas', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La fascioliasis se trata con:', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Albendazol', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Rafoxanida', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Clorsulon', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Todas las opciones anteriores son correctas', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Diarrea es signo clínico característico de:', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Hemoncosis', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Hidatidosis', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Cenurosis', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Esofagostomiasis', '1', true);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Anemia y edema son característicos de:', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Hemoncosis', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Cooperiasis', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Oestrosis', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Dictiocaulosis', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Es signo característico de dictiocaulosis:', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Tos', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Diarrea', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Cólico', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ataxia', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('La coccidiosis se trata con:', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Ampicilia', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Amprolium', '1', true);
INSERT INTO options (description, question_id, correct)
VALUES ('Closantel', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Rafoxanida', '1', false);

INSERT INTO questions (description, category_id, user_id, active,correct,incorrect)
VALUES ('Albendazol es eficaz para tratar:', '3', '1', true,0,0);
INSERT INTO options (description, question_id, correct)
VALUES ('Fascioliasis', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Ostertagiasis', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Hemoncosis ', '1', false);
INSERT INTO options (description, question_id, correct)
VALUES ('Todas las opciones anteriores son correctas', '1', true);

-- Preguntas NUEVAS Clínica Médica y opciones

-- Preguntas NUEVAS Clínica Quirúrgica y opciones

-- Preguntas NUEVAS Manejo Poblacional y opciones



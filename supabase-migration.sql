-- SUPABASE MIGRATION SCRIPT
-- Generated automatically from PostgreSQL data
-- Execute this in your Supabase SQL Editor

-- 1. Create tables (if not exist)
CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR PRIMARY KEY,
        title VARCHAR NOT NULL,
        subtitle VARCHAR,
        type VARCHAR,
        description TEXT,
        image VARCHAR,
        payment_link VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );

CREATE TABLE IF NOT EXISTS products (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        price DECIMAL(10,2),
        category VARCHAR,
        description TEXT,
        image VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );

CREATE TABLE IF NOT EXISTS publications (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        journal VARCHAR,
        year INTEGER,
        abstract TEXT,
        link VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );

CREATE TABLE IF NOT EXISTS admin_users (
        id VARCHAR PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        password_hash VARCHAR,
        is_admin BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );

CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR PRIMARY KEY,
        sess JSONB NOT NULL,
        expire TIMESTAMP NOT NULL
      );

-- 2. Clear existing data
DELETE FROM admin_users;
DELETE FROM publications;
DELETE FROM products;
DELETE FROM courses;

-- 3. Insert courses
INSERT INTO courses (id, title, subtitle, type, description, image, payment_link, created_at) VALUES ('40a7ec06-fc8a-41b9-a75c-a24a74a80642', 'Fitoterapia Amazônica', 'Plantas Medicinais da Floresta', 'Curso online', '<p>Conheça as <strong>propriedades medicinais das plantas amazônicas</strong> e sua aplicação na medicina natural tradicional e contemporânea.</p>

<h3>Módulos do curso:</h3>
<ol>
<li><strong>Introdução à Fitoterapia Amazônica</strong>
   <ul>
   <li>História e tradição indígena</li>
   <li>Biodiversidade farmacológica da Amazônia</li>
   </ul>
</li>
<li><strong>Plantas Medicinais Principais</strong>
   <ul>
   <li>Jatobá, Sangra d''água, Unha de gato</li>
   <li>Preparos e dosagens tradicionais</li>
   </ul>
</li>
<li><strong>Aplicações Terapêuticas</strong>
   <ul>
   <li>Tratamento de inflamações</li>
   <li>Fortalecimento do sistema imunológico</li>
   <li>Cuidados com o sistema digestivo</li>
   </ul>
</li>
</ol>

<blockquote>
<p><em>"A floresta amazônica é a maior farmácia natural do mundo, com mais de 40.000 espécies vegetais catalogadas."</em></p>
</blockquote>

<p><strong>Inclui:</strong> Material didático digital, vídeos práticos e certificado de conclusão.</p>', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071', NULL, NULL);
INSERT INTO courses (id, title, subtitle, type, description, image, payment_link, created_at) VALUES ('3f9eb9ef-369e-4a3b-bf1b-e1408d369b55', 'Cosméticos Naturais', 'Formulação com Ativos Brasileiros', 'Workshop presencial', '<p>Aprenda a <strong>formular cosméticos naturais</strong> utilizando ingredientes ativos da rica biodiversidade brasileira.</p>

<h3>Workshop prático inclui:</h3>
<ul>
<li><strong>Teoria da Formulação Natural</strong>
   <ul>
   <li>Princípios ativos vegetais brasileiros</li>
   <li>Conservação natural e estabilidade</li>
   <li>Regulamentação ANVISA</li>
   </ul>
</li>
<li><strong>Práticas de Laboratório</strong>
   <ul>
   <li>Formulação de séruns faciais</li>
   <li>Máscaras de argila e extratos</li>
   <li>Produtos capilares com óleos nativos</li>
   </ul>
</li>
</ul>

<h3>Ingredientes que você vai trabalhar:</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
<div>
• <strong>Açaí</strong> - Antioxidante<br>
• <strong>Buriti</strong> - Proteção solar<br>
• <strong>Cupuaçu</strong> - Hidratação
</div>
<div>
• <strong>Argila rosa</strong> - Purificação<br>
• <strong>Própolis verde</strong> - Anti-idade<br>
• <strong>Andiroba</strong> - Reparação
</div>
</div>

<p style="background-color: #f0f8f0; padding: 15px; border-left: 4px solid #4a7c59; margin: 20px 0;">
<strong>🌿 Workshop presencial de 8 horas</strong><br>
Inclui todos os materiais, kit de produtos formulados e apostila técnica.
</p>', 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=2070', NULL, NULL);
INSERT INTO courses (id, title, subtitle, type, description, image, payment_link, created_at) VALUES ('fefebfc1-d58c-40c7-83db-a5f2a62e20b5', 'Aromaterapia Brasileira', '15 Óleos Essenciais da Flora Nativa', 'Curso gravado', '<p>Aprenda a praticar uma aromaterapia legitimamente brasileira, através da associação entre o conhecimento científico recente e a tradição secular de uso de plantas medicinais e aromáticas da nossa flora nativa. No curso serão abordadas particularidades botânicas, ecológicas e químicas de 15 plantas e seus óleos essenciais, além de segurança de uso e indicações terapêuticas dos OEs brasileiros para o bem-estar físico e emocional.</p><p><br></p><p><strong>Carga horária:&nbsp;</strong></p><p>16 horas</p><p><br></p><p><strong>Conteúdo:</strong></p><ul><li>Porque estudar, usar e indicar óleos essenciais da flora brasileira.</li><li>Reflexões acerca da sociobiodiversidade brasileira e sustentabilidade.</li><li>Panorama da produção vegetal e pesquisa cientíca.</li><li>Caracterização botânica, ecológica e química dos óleos essenciais (e resinas) de alecrim-do-campo, alecrim-pimenta, araçá, aroeira (pimenta-rosa), breu, candeia, copaíba, erva-baleeira, lippia alba (verbena-branca), pau-rosa, pindaíba, pitangueira, priprioca, sangue-de-dragão e vassourinha-doce.</li><li>Particularidades, estado do conhecimento científico, segurança e indicações de uso para fins físicos e emocionais, para cada um dos óleos essenciais estudados.</li><li>Bônus: Aula Gravada Óleos graxos e Manteigas Vegetais do Brasil.</li></ul><p>&nbsp;</p><p>Aula 1 |&nbsp;Porque estudar, usar e indicar óleos essenciais da flora brasileira. Reflexões acerca da sociobiodiversidade brasileira e sustentabilidade. Conceitos iniciais.</p><p>Aula 2 |&nbsp;Ervas e arbustos aromáticos do Brasil: lipia, alecrim-pimenta, vassourinha-doce, erva-baleeira e alecrim-do-campo</p><p>Aula 3 |&nbsp;Árvores aromáticas do Brasil: candeia, pitangueira, araçá, aroeira e pindaíba</p><p>Aula 4 |&nbsp;Aromáticas Amazônicas: priprioca, breu, pau-rosa, sangue-de-dragão e copaíba</p>', 'https://raw.githubusercontent.com/sergiocostafh/botanical-web/main/client/public/curso1_thumb.png', NULL, NULL);

-- 4. Insert products
INSERT INTO products (id, name, price, category, description, image, created_at) VALUES ('463e7195-cd2d-4412-b902-4d075424dd47', 'Leave-in Fortalecedor Capilar', 85.00, 'terroa', 'Enriquecido com ativos da flora brasileira que fortalecem e protegem os fios.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000', NULL);
INSERT INTO products (id, name, price, category, description, image, created_at) VALUES ('d032dc8c-2928-4469-a443-f636f5bcddbb', 'Máscara Facial Purificante', 79.00, 'terroa', 'Combina argila brasileira e extratos vegetais que purificam e equilibram a oleosidade.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000', NULL);
INSERT INTO products (id, name, price, category, description, image, created_at) VALUES ('af54e196-a5ca-482c-8227-fdb1c6a416e2', 'Óleo Essencial de Copaíba', 65.00, 'oleos', 'Óleo essencial 100% puro extraído da árvore de Copaíba brasileira.', 'https://images.unsplash.com/photo-1608572616160-090b8c70fd77?q=80&w=1000', NULL);

-- 5. Insert publications
INSERT INTO publications (id, title, journal, year, abstract, link, created_at) VALUES (1, 'Bioatividade de Óleos Essenciais da Flora Brasileira', 'Revista Brasileira de Farmacognosia', 2024, 'Estudo sobre as propriedades bioativas de óleos essenciais extraídos de plantas nativas do Brasil e suas aplicações terapêuticas.', 'https://example.com/publication1', NULL);
INSERT INTO publications (id, title, journal, year, abstract, link, created_at) VALUES (2, 'Compostos Fenólicos em Plantas Amazônicas', 'Journal of Natural Products', 2023, 'Análise fitoquímica de compostos fenólicos presentes em espécies vegetais da região amazônica.', 'https://example.com/publication2', NULL);
INSERT INTO publications (id, title, journal, year, abstract, link, created_at) VALUES (3, 'Atividade Antimicrobiana de Extratos Vegetais', 'Phytotherapy Research', 2024, 'Avaliação da atividade antimicrobiana de extratos vegetais de plantas brasileiras contra patógenos comuns.', 'https://example.com/publication3', NULL);

-- 6. Insert admin users
INSERT INTO admin_users (id, email, password_hash, is_admin, created_at) VALUES (2, 'admin@exemplo.com', NULL, undefined, NULL);
INSERT INTO admin_users (id, email, password_hash, is_admin, created_at) VALUES (3, 'sergio.vscf@gmail.com', NULL, undefined, NULL);

-- 7. Verify migration
SELECT COUNT(*) as courses_count FROM courses;
SELECT COUNT(*) as products_count FROM products;
SELECT COUNT(*) as publications_count FROM publications;
SELECT COUNT(*) as admin_users_count FROM admin_users;

SELECT 'Migration completed successfully!' as status;
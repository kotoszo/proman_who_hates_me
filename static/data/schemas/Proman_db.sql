--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.7
-- Dumped by pg_dump version 9.5.7

-- Started on 2017-07-06 12:59:27 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2167 (class 1262 OID 16502)
-- Name: proman; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE proman WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect proman

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12395)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2169 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 184 (class 1259 OID 16532)
-- Name: boards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE boards (
    id integer NOT NULL,
    user_id integer,
    title character varying(250)
);


--
-- TOC entry 183 (class 1259 OID 16530)
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2170 (class 0 OID 0)
-- Dependencies: 183
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE boards_id_seq OWNED BY boards.id;


--
-- TOC entry 186 (class 1259 OID 16545)
-- Name: cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE cards (
    id integer NOT NULL,
    board_id integer,
    state character varying(250),
    title character varying(250)
);


--
-- TOC entry 185 (class 1259 OID 16543)
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2171 (class 0 OID 0)
-- Dependencies: 185
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE cards_id_seq OWNED BY cards.id;


--
-- TOC entry 182 (class 1259 OID 16524)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(30),
    password character varying(120)
);


--
-- TOC entry 181 (class 1259 OID 16522)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2172 (class 0 OID 0)
-- Dependencies: 181
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 2033 (class 2604 OID 16535)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY boards ALTER COLUMN id SET DEFAULT nextval('boards_id_seq'::regclass);


--
-- TOC entry 2034 (class 2604 OID 16548)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY cards ALTER COLUMN id SET DEFAULT nextval('cards_id_seq'::regclass);


--
-- TOC entry 2032 (class 2604 OID 16527)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 2160 (class 0 OID 16532)
-- Dependencies: 184
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY boards (id, user_id, title) FROM stdin;
28	9	wow
29	9	wows
30	9	wowsa
31	9	wowsad
32	9	asd
33	9	wa
34	9	ds
35	9	asd
36	9	sd
37	9	sd
38	9	ww
39	9	as
40	9	oujea
41	9	aassad
42	9	ssd
43	9	lolo
44	9	lola
45	9	lala
46	9	mukodik
47	9	asd
48	9	lala
49	9	wd
50	9	sd
51	9	sd
52	9	aw
53	9	a
54	9	w
55	9	sd
56	9	w
57	9	s
58	9	666
59	9	blblabla
60	9	33
61	9	alma
62	9	bla
63	9	sd
64	9	ujtábla
65	9	waorrr
66	9	66
67	9	atesz
68	9	asd
69	9	dsa
70	9	adasasd
71	9	f5
72	9	dataw
74	9	new ba
75	9	newbb
76	9	asd
77	9	titulus
78	10	board
79	10	boardie
80	10	lola
81	11	title
82	11	asdtitle
83	11	asdw
84	10	title
\.


--
-- TOC entry 2173 (class 0 OID 0)
-- Dependencies: 183
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('boards_id_seq', 84, true);


--
-- TOC entry 2162 (class 0 OID 16545)
-- Dependencies: 186
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY cards (id, board_id, state, title) FROM stdin;
7	78	done	dani
10	78	inprog	daaniawa
8	78	inprog	danidsass
9	78	inprog	danikalakaswwdwd
11	78	new	alma
12	78	review	rev card
13	78	new	alm2
14	78	inprog	title
20	84	new	new
22	84	review	review
23	84	done	done
24	84	in-progress	titulus
25	84	in-progress	inprogi
26	84	in-progress	WRAAAAAAAA
27	84	in-progress	inrp
28	84	in-progress	we
29	84	in-progress	origlogi
30	84	review	reve
31	84	in-progress	tit
32	84	in-progress	alma
33	84	in-progress	este van már
21	84	in-progress	inprogiae
\.


--
-- TOC entry 2174 (class 0 OID 0)
-- Dependencies: 185
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('cards_id_seq', 33, true);


--
-- TOC entry 2158 (class 0 OID 16524)
-- Dependencies: 182
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (id, username, password) FROM stdin;
6	hülyevagy	pbkdf2:sha256:50000$nT8SuVJL$282eaff689f286213a045366379a8e8fcd9ab2c1b36fdaed289dfd20f5ec38fe
7	regi	pbkdf2:sha256:50000$xMQbxu0w$7c776af62f9a4efab30cb4940c397de916023ea7e4e36123f877f8d7a54fb389
8	kopi	pbkdf2:sha256:50000$PBtWd8U8$37b068c75de52d55411dd200d6f6f98f1880a93e525f7c725a661431e55e706a
9	user	pbkdf2:sha256:50000$Ivk9IshJ$2a705d01715bfdb8e3be6060e162d28f0eb5dda99e8376e972bc576c26cf0219
10	tomi	pbkdf2:sha256:50000$ufr8DvPz$7c71fe23f126d2b17ae60f1876e66de45819603c2791422eed90a739ce93bea1
11	name	pbkdf2:sha256:50000$w0wqSfbj$9c4551f06afa2a31518c2303675b6798e816b2ec8584ab70636fd2f5e45a5fa1
12	namie	pbkdf2:sha256:50000$636mKwQ0$34af63661968cc6184ac73b036a1309cbfba57d7fefee2c27390da029ada13e0
13	láb	pbkdf2:sha256:50000$NIsmSNq7$52cb11894e56e930cf24061b594fe1f83008696b1fd9288d0b48b4ffe8a691bf
14	pwsd	pbkdf2:sha256:50000$DePrrwTi$80fd2fa2d62af4ec75c0f77d04bee9c7cb0f1290171ceda4a9658339332f79fe
\.


--
-- TOC entry 2175 (class 0 OID 0)
-- Dependencies: 181
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users_id_seq', 14, true);


--
-- TOC entry 2038 (class 2606 OID 16537)
-- Name: boards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- TOC entry 2040 (class 2606 OID 16553)
-- Name: cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- TOC entry 2036 (class 2606 OID 16529)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2041 (class 2606 OID 16538)
-- Name: boards_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY boards
    ADD CONSTRAINT boards_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2042 (class 2606 OID 16559)
-- Name: cards_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY cards
    ADD CONSTRAINT cards_board_id_fkey FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;


-- Completed on 2017-07-06 12:59:27 CEST

--
-- PostgreSQL database dump complete
--


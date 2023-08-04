--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.10
-- Dumped by pg_dump version 9.5.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: listings; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE listings (
    id integer NOT NULL,
    user_id integer,
    name character varying(255) NOT NULL,
    is_sold boolean DEFAULT false
);


ALTER TABLE listings OWNER TO labber;

--
-- Name: users; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(255) DEFAULT 'Guest'::character varying NOT NULL,
    username character varying(255),
    email character varying(255) DEFAULT 'example@example.com'::character varying NOT NULL,
    password character varying(255) DEFAULT 'default_password'::character varying NOT NULL,
    isadmin boolean DEFAULT false
);


ALTER TABLE users OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: widgets_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE widgets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE widgets_id_seq OWNER TO labber;

--
-- Name: widgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE widgets_id_seq OWNED BY listings.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY listings ALTER COLUMN id SET DEFAULT nextval('widgets_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY listings (id, user_id, name, is_sold) FROM stdin;
1	1	Item1	f
2	2	Item2	f
3	2	Item3	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY users (id, name, username, email, password, isadmin) FROM stdin;
1	Alice	\N	example@example.com	default_password	f
2	Kira	\N	example@example.com	default_password	f
7	Guest	username	email@email.com	$2b$10$Hjxm0JPpGd5B2GRFds8jXeF5Vs9r8yrSFuJhB7hcwZU.O6k1TzBKq	f
8	Guest	mrman	emailman@email.com	$2b$10$tnB3BpkjyUF4WQ46CL7OPuSBYq128RqJknBjNUHiMvGcJ3CRfKGwi	f
10	Guest	testerman	email@email.com	$2b$10$eXTZ3tY8iQrZnfw3kOwm3.IG/hPHgbI8bnTpr4VppYX86qXPSAbJ6	f
11	Guest	qwerty	fake@email.com	$2b$10$JjffnsK0azJX5mU0MeNUiumxma/1XtLb.NGyvixlOBt8t.AlphG0O	f
12	Guest	Admin	ebuyLHL@gmail.com	$2b$10$REion0XZkV.PQl9Y2igZNO3KBR0xfiigjE9F7yX4A49IpnmYt8gbm	t
15	Guest	testingthis	testerman@email.com	$2b$10$8n.dD1VklDwNx24C5VocGuKO4fcyce8gmUdXXpAFiae86MNtFJNWK	f
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('users_id_seq', 15, true);


--
-- Name: widgets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('widgets_id_seq', 3, true);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: widgets_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY listings
    ADD CONSTRAINT widgets_pkey PRIMARY KEY (id);


--
-- Name: widgets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY listings
    ADD CONSTRAINT widgets_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


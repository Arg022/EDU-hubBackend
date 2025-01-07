# EDU-hub Backend

Questo è il backend per l'applicazione **EDU-hub**, costruito utilizzando **Java** con il framework Javalin e un ulteriore backend in **Node.js**.

---

## Prerequisiti

- **Java**: Versione 8 o superiore
- **Maven**: Per la gestione delle dipendenze Java
- **Node.js**: Per il backend nella cartella `backend`
- **PostgreSQL**: Per il database

---

## Guida all'installazione

### 1. Clona il repository

Clona il repository e spostati nelle cartelle necessarie:

```bash
git clone https://github.com/tuo-username/EDU-hubBackend.git
cd EDU-hubBackend
```

---

### 2. Configura il database

Assicurati che **PostgreSQL** sia installato e in esecuzione. Segui questi passi per configurare il database:

#### a) Crea il database

1. Apri un client PostgreSQL (ad esempio il CLI `psql` o un'interfaccia grafica come pgAdmin).
2. Esegui i seguenti comandi SQL per creare il database:

```sql
CREATE DATABASE learning_platforms;
CREATE DATABASE learning_materials;
```

eseguite gli sql `learning_platform.sql` e `learning_materials.sql` nei rispettivi db;

---

### 3. Configura il backend Node.js

Spostati nella cartella `backend` ed esegui i seguenti comandi:

```bash
cd backend
npm install
```

---

### 4. Avvia il server Java

Spostati nella cartella del server Java ed esegui i seguenti comandi:

```bash
cd middleware/MiddlewareServer
mvn clean install
```

1. Torna alla cartella `util/database`.
2. cambia le credenziali per gestire il tuo collegamento a postgre

```bash
mvn exec:java -Dexec.mainClass="com.prosperi.argeo.Main"
```

Il server partirà sulla porta `8082`.

---

### 5. Configura e avvia il backend Node.js

1. Torna alla cartella `backend`.
2. Crea un file `.env` copiando `.env.prototype`:

```bash
cp .env.prototype .env
```

3. Modifica il file `.env` per assicurarti che i dettagli del database corrispondano.
4. Avvia il server Node.js:

```bash
npm run dev
```

Il server Node.js sarà disponibile sulla porta configurata (default: `3000`).

---

### 6. login creati tramite dataloader:

1. `admin@example.com` password: `securepassword`
2. `teacher@example.com` password: `teacher123`
3. `student@example.com` password: `student123`

se volete registrare altri utenti andare sulla rotta `/auth/register`

---

## Endpoints disponibili

### Backend Java (porta 8082)

- **AuthController**: Gestisce l'autenticazione.
- **UserController**: Gestisce gli utenti.
- **CourseController**: Gestisce i corsi.
- **SubjectController**: Gestisce le materie.
- **LessonController**: Gestisce le lezioni.
- **EnrollmentController**: Gestisce le iscrizioni.
- **TeachingController**: Gestisce le assegnazioni didattiche.
- **AttendanceController**: Gestisce la presenza.
- **QuizController**: Gestisce i quiz.
- **QuestionController**: Gestisce le domande.
- **AnswerController**: Gestisce le risposte.
- **QuizResultController**: Gestisce i risultati dei quiz.
- **StudentAnswerController**: Gestisce le risposte degli studenti.
- **NotificationController**: Gestisce le notifiche.

### Backend Node.js (porta 3000)

- **FileController**: Gestisce il caricamento e la gestione dei file.

---

## Struttura del progetto

### Cartella principale

- `backend/`: Contiene il backend Node.js.
- `middleware/`: Contiene il backend/middelware Java.

### Database
1. crea 2 database chiamati `learning_platforms` e learning_materials
- `database/learning_platforms.sql`: Script SQL per la per salvare e gestire gli utenti quiz corsi ed altro.
- `database/learning_materials.sql`: Script SQL per salvare i materiali didattici.

---

## Licenza

Questo progetto è rilasciato sotto la licenza MIT.

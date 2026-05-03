import LessonContent from '@/components/LessonContent';

export default function SQLiLesson() {
  return (
    <LessonContent 
      id="sqli"
      title="SQLi Defense"
      vulnerability="SQL Injection (SQLi) allows an attacker to interfere with the queries that an application makes to its database. It can be used to view, modify, or delete sensitive data."
      explanation={`SQL Injection happens when user-supplied data is concatenated directly into a SQL query string. An attacker can input SQL keywords like 'OR 1=1' to bypass authentication or 'DROP TABLE' to destroy data.

The most effective defense against SQLi is the use of Parameterized Queries (also known as Prepared Statements). This ensures that the database treats user input as data, not as executable code.

Even though Vibe Sentry does not use a persistent database (following our serverless architectural constraint), the principle of input sanitization and strict typing still applies to all data processing layers.`}
      defenseSnippet={`// Defensive Pattern: Parameterized Execution
// (Conceptual example of the defensive philosophy)

async function getUser(id: string) {
  // WRONG: Concatenation
  // const query = "SELECT * FROM users WHERE id = '" + id + "'";
  
  // RIGHT: Parameterized Query
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows;
}

// In Vibe Sentry, we prioritize data isolation 
// and schema-less ephemeral state.`}
      practiceInstructions="Identify the difference between string concatenation and parameterized queries. In a professional environment, never build query strings from user input. Click the button below to verify your knowledge."
    />
  );
}

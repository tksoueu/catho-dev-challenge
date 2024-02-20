import Link from 'next/link'
import styles from "@/styles/pages.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Gerenciador de Candidatos</h1>
        <div className={styles.buttonContainer}>
          <Link href="/addCandidate">
            <button className={styles.button}>Adicionar Candidato</button>
          </Link>
          <Link href="/searchCandidates">
            <button className={styles.button}>Buscar Candidatos</button>
          </Link>
        </div>
        <hr />
      </div>
    </main>
  )
}
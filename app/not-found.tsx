import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-abyss text-white">
      <div className="container-x pt-24">
        <p className="eyebrow text-lagoon">Fehler 404</p>
        <h1 className="display mt-4 text-[48px] md:text-[80px]">
          Diese Seite ist <em className="text-lagoon">abgetaucht.</em>
        </h1>
        <Link href="/" className="btn btn-light mt-10">
          Zurück an die Oberfläche
        </Link>
      </div>
    </section>
  );
}

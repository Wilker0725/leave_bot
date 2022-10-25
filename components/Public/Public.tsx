import Link from "next/link";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to
          <span className="nowrap">Government Technology Agency</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Mapletree Business City, provides Digital
          Services to building Smart Nation Infrastructure.
        </p>
        <address className="public__addr">
          10 Pasir Panjang Rd,
          <br />
          #10-01 Mapletree Business City
          <br />
          Singapore 117438
          <br />
          <a href="tel:+6562110888">+65 6211 0888</a>
        </address>
        <br />
        <p>Owner: GovTech</p>
      </main>
      <footer>
        <Link href="/login"></Link>
      </footer>
    </section>
  );

  return content;
};

export default Public;

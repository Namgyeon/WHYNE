<<<<<<< HEAD
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
=======
import Gnb from "@/components/Gnb";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full bg-[#F2F4F8]">
      <div className="w-[1140px]">
        <header className="h-[70px] mt-[24px] my-[390px] mb-[80px]">
          <Gnb />
        </header>

        {/* 메인 이미지 섹션 */}
        <section className="relative h-[535px] rounded-[16px] bg-[#171A21] flex justify-center items-center">
          <Image
            src="/images/home/lg_01.png"
            alt="홈 메인 이미지"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            quality={100}
          />
        </section>

        <div className="flex flex-col items-center mt-[160px]">
          <section className="flex flex-wrap justify-center items-center gap-x-[29.5px] gap-y-[96px]">
            <div className="relative w-[640px] h-[320px] flex justify-center items-center">
              <Image
                src="/images/home/lg_02.png"
                alt="와인 추천"
                width={640}
                height={320}
                quality={100}
                className="rounded-lg"
              />
            </div>

            <div className="relative w-[640px] h-[320px] flex justify-center items-center">
              <Image
                src="/images/home/lg_03.png"
                alt="맞춤 와인"
                width={640}
                height={320}
                quality={100}
                className="rounded-lg"
              />
            </div>

            <div className="relative w-[640px] h-[320px] flex justify-center items-center">
              <Image
                src="/images/home/lg_04.png"
                alt="리뷰 시스템"
                width={1140}
                height={320}
                quality={100}
                className="rounded-lg"
              />
            </div>
          </section>

          <span className="w-[279px] h-[50px] bg-[#6A42DB] text-white flex justify-center items-center rounded-[100px] mt-[104px] mx-[820.5px] mb-[109px] cursor-pointer">
            <Link href="/winelist">와인 보러가기</Link>
          </span>
        </div>
      </div>
    </main>
>>>>>>> develop
  );
}

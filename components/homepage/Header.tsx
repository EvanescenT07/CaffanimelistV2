import Link from "next/link";

const TitleSection = ({
  title,
  linkHref,
  linkTitle,
}: {
  title: string;
  linkHref?: string;
  linkTitle?: string;
}) => {
  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
        {title}
      </h1>
      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="text-lg bg-light-secodary/30 dark:bg-dark-secondary/30 p-2 rounded-2xl text-light-text hover:text-light-accent dark:text-dark-text hover:dark:text-dark-accent transition-all"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default TitleSection;

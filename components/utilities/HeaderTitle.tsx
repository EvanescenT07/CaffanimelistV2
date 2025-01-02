const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
      {title}
    </h1>
  );
};

export default HeaderTitle;

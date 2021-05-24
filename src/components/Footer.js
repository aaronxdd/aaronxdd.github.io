const Footer = () => {
  return (
    <footer className="py-4 text-center border divide-solid divide-gray-100 font-serif text-base">
    © {new Date().getFullYear()}
    {` `}
    <a className="text-blue-600" href="https://github.com/aaronxdd">Dongdong Xu</a>, Hosted on
    {` `}
    <a className="text-blue-600" href="https://pages.github.com">GitHub Pages</a>
    </footer>
  );
};

export default Footer;

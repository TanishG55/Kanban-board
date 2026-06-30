import Sidebar from "../sidebar/Sidebar";

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};

export default Layout;

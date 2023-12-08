
import Header from "../../components/Header";
import { api } from "../../services/apiService";
import { useRef, useState } from "react";
import Button from "../../components/Button";
import DateInput from "../../components/DatePicker";
import FormSelect from "../../components/FormSelect";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";

import { Form } from "@unform/web";
import { AreaComp, Container, Row } from "../../styles/global";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [dataDoEvento, setDataDoEvento] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [listProducts, setListProducts] = useState([]);

  const formRefFilter = useRef(null);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const columns = [
    { field: "title", headerName: "Produto", width: 300 },
    { field: "Store", headerName: "Loja", width: 150 },
    { field: "price", headerName: "Preço", width: 160 },
    {
      field: "link",
      headerName: "Link Produto",
      type: "number",
      width: 110,
    },
  ];

  const options = [
    { value: "Placa de video", label: "Placa de video" },
    { value: "Mouse", label: "Mouse" },
    { value: "Mousepad gamer", label: "Mousepad" },
    { value: "Gabinete", label: "Gabinete" },
    { value: "Teclado gamer", label: "Teclado gamer" },
    { value: "Monitor", label: "Monitor" },
  ];

  const handleDataChange = (event) => {
    setDataDoEvento(event.target.value);
  };

  const handleFilterProducts = async (formData) => {
    const { product } = formData;

    try {
      const response = await api.get(`/products/${dataDoEvento}/${product}`);
      const productsObject = response.data;

      const productsArray = Object.values(productsObject);

      const productsWithIds = productsArray.map((product, index) => ({
        ...product,
        id: product.link || index,
      }));

      const filteredProducts = productsWithIds.filter((product) => {
        return !Object.values(product).some((value) => /N\/A/i.test(value));
      });

      setListProducts(filteredProducts);
    } catch (err) {
      toast.error(
        "A data informada não coincide com as datas em que as varreduras foram realizadas."
      );
    }
  };
  const handleExportToExcel = () => {
    if (listProducts.length === 0) {
      console.log("Nenhum produto para exportar.");
      return;
    }

    try {
      // Convertendo o array de objetos de volta para um objeto onde as chaves são os links
      const productsObject = listProducts.reduce((obj, product) => {
        obj[product.link] = product;
        return obj;
      }, {});

      // Convertendo o objeto em um array de arrays
      const productsArray = Object.values(productsObject);

      // Criando um objeto de workbook do Excel
      const wb = XLSX.utils.book_new();

      // Adicionando uma planilha ao workbook
      const ws = XLSX.utils.json_to_sheet(productsArray);

      // Adicionando estilos para tornar as linhas maiores
      ws["!rows"] = [{ hpt: 30, hpx: 16 }];

      // Adicionando estilos adicionais conforme necessário (por exemplo, bordas, cores, etc.)

      XLSX.utils.book_append_sheet(wb, ws, "Produtos");

      // Salvando o arquivo Excel
      XLSX.writeFile(wb, "produtos.xlsx");

      console.log("Exportação concluída.");
    } catch (error) {
      console.error("Erro ao exportar para Excel:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Form ref={formRefFilter} onSubmit={handleFilterProducts}>
          <Row mgtop="20">
            <AreaComp wd="30" ptop="16px">
              <DateInput
                label="Data para filtro:"
                name="date"
                value={dataDoEvento}
                onChange={(e) => handleDataChange(e)}
              />
            </AreaComp>
            <AreaComp wd="30">
              <FormSelect
                label="Produto:"
                name="product"
                options={options}
                onChange={(value) => setSelectedOption(value)}
              />
            </AreaComp>
            <AreaComp wd="15" ptop="24px">
              <Button
                Text="Buscar"
                onClick={() => formRefFilter.current.submitForm()}
              ></Button>
            </AreaComp>
            <AreaComp wd="15" ptop="24px">
              <Button
                Text="Exportar"
                onClick={() => handleExportToExcel()}
                disabled={listProducts < 0}
              ></Button>
            </AreaComp>
          </Row>
        </Form>
        <ThemeProvider theme={darkTheme}>
          <div style={{ height: 400, width: "100%", padding: "10px" }}>
            <DataGrid
              rows={listProducts}
              columns={columns}
              pageSize={7}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </ThemeProvider>
      </Container>
    </>
  );
}

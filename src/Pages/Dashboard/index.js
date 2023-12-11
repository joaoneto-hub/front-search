import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import DateInput from "../../components/DatePicker";
import FormSelect from "../../components/FormSelect";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc, // Substituído de getDoc para getDocs
} from "firebase/firestore";
import * as XLSX from "xlsx";
import { format } from "date-fns";

import { Form } from "@unform/web";
import { AreaComp, Container, Row } from "../../styles/global";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [dataDoEvento, setDataDoEvento] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [listProducts, setListProducts] = useState([]);

  const formRefFilter = useRef(null);

  const db = getFirestore();

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
      width: 510,
      renderCell: (params) => (
        <a href={params.row.link} target="_blank" rel="noopener noreferrer">
          {params.row.link}
        </a>
      ),
    },
  ];

  const options = [
    { value: "Placa de vídeo", label: "Placa de vídeo" },
    { value: "Mouse", label: "Mouse" },
    { value: "Mousepad gamer", label: "Mousepad" },
    { value: "Gabinete", label: "Gabinete" },
    { value: "Teclado gamer", label: "Teclado gamer" },
    { value: "Monitor", label: "Monitor" },
  ];
  const handleDataChange = (event) => {
    setDataDoEvento(event.target.value);
  };

  const buscarProdutosPorData = async (data, product) => {
    try {
      const collectionRef = collection(db, data);

      const querySnapshot = await getDocs(collectionRef);

      const documentosFiltrados = querySnapshot.docs
        .filter((doc) => doc.id === product)
        .map(async (doc) => {
          const documentSnapshot = await getDoc(doc.ref);

          if (documentSnapshot.exists()) {
            const dadosDoDocumento = documentSnapshot.data();
            const productsArray = Object.values(dadosDoDocumento);

            const productsWithIds = productsArray.map((product, index) => ({
              ...product,
              id: product.link || index,
            }));

            const filteredProducts = productsWithIds.filter((product) => {
              return !Object.values(product).some((value) =>
                /N\/A/i.test(value)
              );
            });

            setListProducts(filteredProducts);
          } else {
            toast.log("Não existe registro para essa data.");
          }
        });

      await Promise.all(documentosFiltrados);
    } catch (err) {
      toast.info("Não existe registro para essa data.");
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
      ws["!rows"] = [{ hpt: 40, hpx: 26 }];

      // Adicionando estilos adicionais conforme necessário (por exemplo, bordas, cores, etc.)

      XLSX.utils.book_append_sheet(wb, ws, "Produtos");

      // Salvando o arquivo Excel
      XLSX.writeFile(wb, "produtos.xlsx");

      toast.success("Exportação concluída.");
    } catch (error) {
      toast.error("Erro ao exportar para Excel:", error);
    }
  };


  return (
    <>
      <Header />
      <Container>
        <Form ref={formRefFilter}>
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
                onClick={() =>
                  buscarProdutosPorData(dataDoEvento, selectedOption)
                }
              ></Button>
            </AreaComp>
            <AreaComp wd="15" ptop="24px">
              <Button
                Text="Exportar"
                onClick={() => handleExportToExcel()}
                disabled={listProducts.length === 0}
              ></Button>
            </AreaComp>
          </Row>
        </Form>
        <ThemeProvider theme={darkTheme}>
          <div
            style={{
              height: 500,
              width: "100%",
              padding: "10px",
              color: "#fff",
            }}
          >
            <DataGrid rows={listProducts} columns={columns} />
          </div>
        </ThemeProvider>
      </Container>
    </>
  );
}

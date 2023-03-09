import {
  Card,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { CartProps, ProductProps } from "../model";

const Product: React.FC<ProductProps> = ({ checkout }) => {
  const { emission, product, model, media, validity } = checkout;

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Box
            sx={{
              width: "80px",
              height: "80px",
              borderRadius: "12px",
            }}
          >
            <img
              style={{ overflow: "hidden", borderRadius: "12px" }}
              src="https://via.placeholder.com/80"
              alt="Imagem do Produto"
            />
          </Box> */}
          <Box>
            <Typography fontWeight={600} fontSize="0.875rem" noWrap>
              {product}
            </Typography>
            {/* <Typography
              fontSize="0.875rem"
              fontWeight={400}
              color="rgb(33, 43, 54)"
            >
              Desconto:{" "}
            </Typography> */}
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography
          fontSize="0.875rem"
          fontWeight={400}
          color="rgb(33, 43, 54)"
        >
          {model}
        </Typography>
      </TableCell>
      <TableCell>{media}</TableCell>
      <TableCell>
        <Typography
          fontSize="0.875rem"
          fontWeight={400}
          color="rgb(33, 43, 54)"
        >
          {validity}
        </Typography>
      </TableCell>
      <TableCell>{emission}</TableCell>
      {/* <TableCell>
        <IconButton>
          <Icon icon={trash2Outline} />
        </IconButton>
      </TableCell> */}
    </TableRow>
  );
};

const Cart: React.FC<CartProps> = ({ checkout }) => {
  const state = true;

  return (
    <TableContainer >
      <Table>
        <TableHead>
          <TableRow sx={{ borderRadius: "none" }}>
            <TableCell sx={{ boxShadow: "none" }}>Produto</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Mídia</TableCell>
            <TableCell>Validade</TableCell>
            <TableCell>Emissão</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <Product checkout={checkout} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cart;

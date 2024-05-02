import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { useMemo, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./style.css";
interface SubCampaignProps {
  register?: any;
  name?: string;
}

const SubCampaign = (props: SubCampaignProps) => {
  const { register, name } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tempValue, setTempValue] = useState("Chiến dịch con 1");
  const [checked, setChecked] = useState(true);
  const [campaign, setCampaign] = useState([
    {
      id: 0,
      label: "Chiến dịch con 1",
      count: 0,
      isActive: true,
    },
  ]);
  const handleAddSubCompaign = () => {
    setCampaign([
      ...campaign,
      {
        id: campaign.length + 1,
        label: `Chiến dịch con ${campaign.length + 1}`,
        count: 0,
        isActive: true,
      },
    ]);
    setSelectedIndex(campaign.length + 1);
    setChecked(true);
  };

  useMemo(() => {
    campaign.find((el) =>
      el.id === selectedIndex ? setTempValue(el.label) : null
    );
  }, [selectedIndex]);

  const handleChange = (e: any) => {
    setTempValue(e.target.value);
    setCampaign((pre) => {
      return pre.map((el) =>
        el.id === selectedIndex
          ? {
              ...el,
              label: e.target.value,
            }
          : el
      );
    });
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    campaign.find((el) => {
      if (el.id === index) {
        setTempValue(el.label);
        setChecked(el.isActive);
        return;
      }
    });
  };

  const handleChangeStatus = (e: any) => {
    setCampaign((pre) => {
      return pre.map((preItem) =>
        preItem.id === selectedIndex
          ? {
              ...preItem,
              isActive: e.target.checked ?? false,
            }
          : preItem
      );
    });
    setChecked(!checked);
  };

  return (
    <Box sx={{ flexGrow: 5 }} height={"auto"}>
      <Grid container spacing={4}>
        <Grid item container>
          <List
            sx={{
              maxWidth: "100%",
              bgcolor: "background.paper",
              gap: 5,
              display: "flex",
              overflowX: "auto",
            }}
            style={{
              whiteSpace: "nowrap",
            }}
            disablePadding
          >
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={handleAddSubCompaign}
              sx={{ minWidth: 50, minHeight: 50 }}
              style={{ boxShadow: "none" }}
            >
              <AddIcon />
            </Fab>
            {Array.from(campaign).map((el, index) => (
              // <Grid item md={24} key={index}>
              <ListItemButton
                selected={selectedIndex === el.id}
                onClick={(event) => handleListItemClick(event, el.id)}
                style={{ padding: 0 }}
                sx={{ minWidth: 180, minHeight: 130 }}
                // onChange={(e) => handleChangeValue(e, el.id)}
              >
                <Paper
                  sx={{ minWidth: 180, minHeight: 130 }}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedIndex === el.id
                        ? "2px solid rgb(33, 150, 243)"
                        : "",
                  }}
                  // onClick={handleChangeValue}
                >
                  <div>
                    <div>
                      {el.label}
                      <CheckCircleIcon
                        fontSize="small"
                        style={{ fill: el.isActive ? "green" : "" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: 25,
                      color: "black",
                    }}
                  >
                    {el.count}
                  </div>
                </Paper>
              </ListItemButton>
              // </Grid>
            ))}
          </List>
        </Grid>
        <Grid container spacing={2} item>
          <Grid item xs={8} style={{ padding: 16 }}>
            <TextField
              sx={{ padding: "10px" }}
              error={name && name.length ? true : false}
              id="subCampaigns"
              label="Tên chiến dịch con"
              required
              variant="standard"
              fullWidth
              // value={tempValue}
              // onChange={handleChange}
              helperText={name}
              {...register("subCampaigns")}
              size="small"
              className="MuiInputLabel"
            />
          </Grid>
          <Grid item xs={4} style={{ padding: 0 }}>
            <FormControlLabel
              sx={{
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                height: "100%",
              }}
              control={<Checkbox checked={checked} />}
              label="Đang hoạt động"
              onChange={handleChangeStatus}
            />
          </Grid>
        </Grid>
        <Container sx={{ padding: 0, margin: 0, height: "auto" }}>
          <Grid container>
            <Grid item maxWidth="100%">
              <FormLabel
                sx={{ fontSize: 25, fontWeight: 500 }}
                style={{ padding: "16px" }}
                className="aa"
              >
                Danh sách quảng cáo
              </FormLabel>
            </Grid>
            <Grid>
              
            </Grid>
          </Grid>

        </Container>
      </Grid>
    </Box>
  );
};

export default SubCampaign;

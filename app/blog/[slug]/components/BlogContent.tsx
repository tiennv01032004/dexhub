import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { Box, Typography } from "@mui/material";

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { url, fileName } = node.data.target.fields.file;
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: { xs: 3, md: 5 },
          }}
        >
          <Box
            component="figure"
            sx={{ m: 0, textAlign: "center", width: "100%" }}
          >
            <Box
              component="img"
              src={`https:${url}`}
              alt={fileName}
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "12px",
                display: "block",
                mx: "auto",
                boxShadow: 2,
              }}
            />
          </Box>
        </Box>
      );
    },
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <Box
        component="ul"
        sx={{
          pl: { xs: 2, sm: 4 },
          mb: 3,
          listStyleType: "disc",
          "& li p": { m: 0 },
        }}
      >
        {children}
      </Box>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <Box
        component="ol"
        sx={{ pl: { xs: 2, sm: 4 }, mb: 3, listStyleType: "decimal" }}
      >
        {children}
      </Box>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <Box
        component="li"
        sx={{
          mb: 1,
          fontSize: { xs: "1rem", md: "1.1rem" },
          lineHeight: 1.6,
        }}
      >
        {children}
      </Box>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          lineHeight: 1.8,
          fontSize: { xs: "1rem", md: "1.1rem" },
          textAlign: "justify",
        }}
      >
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <Typography
        variant="h4"
        sx={{
          mt: { xs: 4, md: 6 },
          mb: { xs: 2, md: 3 },
          fontWeight: "bold",
          color: "primary.main",
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" },
        }}
      >
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <Typography
        variant="h5"
        sx={{
          mt: { xs: 3, md: 4 },
          mb: { xs: 1.5, md: 2 },
          fontWeight: "bold",
          color: "text.primary",
          fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" },
        }}
      >
        {children}
      </Typography>
    ),

    [BLOCKS.TABLE]: (node: any, children: any) => (
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          m: 0,
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "divider",
          "& th, & td": {
            border: "1px solid",
            borderColor: "divider",
            p: { xs: 1, md: 2 },
            textAlign: "left",
            "& p": { m: 0 },
          },
        }}
      >
        <Box
          component="table"
          sx={{
            width: "100%",
            minWidth: { xs: "400px", sm: "100%" },
            borderCollapse: "collapse",
            "& th, & td": {
              border: "1px solid",
              borderColor: "divider",
              p: { xs: "6px 8px", md: 2 },
              textAlign: "left",
            },
          }}
        >
          <Box component="tbody">{children}</Box>
        </Box>
      </Box>
    ),

    [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: any) => (
      <Box
        component="th"
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          fontWeight: "bold",
          fontSize: { xs: "0.75rem", md: "0.9rem" },
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Box>
    ),

    [BLOCKS.TABLE_CELL]: (node: any, children: any) => (
      <Box
        component="td"
        sx={{
          fontSize: { xs: "0.7rem", md: "0.875rem" },
          verticalAlign: "top",
          lineHeight: 1.3,
          wordBreak: "break-word",
        }}
      >
        {children}
      </Box>
    ),
  },
};

interface BlogContentProps {
  content: any;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <Box sx={{ mb: 10 }}>
      {documentToReactComponents(
        {
          ...content,
          content: content.content.filter(
            (node: any) => node.nodeType !== "heading-1",
          ),
        },
        renderOptions,
      )}
    </Box>
  );
}

import React from "react";

import { Card, CardContent, Grid, Typography } from "@mui/material";

const Category = () => {
    return (
        <div>
            <Typography>
              Categories User
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                          This is a content
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                          This is a content
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                          This is a content
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                          This is a content
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Category;

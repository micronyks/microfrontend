import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { REPLCommand } from "repl";


const DashboardTileComponent: React.FC = () => {
    return (<div>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Welcome to Dashboard
                </Typography>
                <Typography variant="h5" component="div">
                    Dashboard
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   Wide Ui Project
                </Typography>
                <Typography variant="body2">
                   This is our Dashboard view of WiDE UI
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link to='/dashboard/speedometerview'> SpeedoMeterView</Link></Button>
                <Button size="small"><Link to='/dashboard/mapview'> MapView</Link></Button>
            </CardActions>
        </Card>
    </div>)
}

export default DashboardTileComponent;
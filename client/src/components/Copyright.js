import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
export function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center" style={{position:'absolute',bottom:'0'}}>
        {'Copyright © '}
        <Link color="inherit" href="/">
        Apex Team
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
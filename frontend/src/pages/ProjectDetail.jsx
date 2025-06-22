import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography } from '@mui/material';
import ReactLogo from '../assets/react.png';
import NodeLogo from '../assets/node.png';
import FlaskLogo from '../assets/flask.png';
import MongoLogo from '../assets/mongo.png';
import PostGresLogo from '../assets/postgres.png';
import PythonLogo from '../assets/python.png';
import PytorchLogo from '../assets/pytroch.png';
import ScikitLogo from '../assets/scikit.png';
import SequelizeLogo from '../assets/sequelize.png';
import EJSLogo from '../assets/ejs.png';
import JqueryLogo from '../assets/jquery.png';
import JavascriptLogo from '../assets/javascript.png';
import PassportLogo from '../assets/passport.png';
import PaytmLogo from '../assets/paytm.png';
import OpenCVLogo from '../assets/opencv.png';
import ZoomLogo from '../assets/zoom.png';
import HTMLLogo from '../assets/html.png';
import CSSLogo from '../assets/css.png';
import FirebaseLogo from '../assets/firebase.png';
import DlibLogo from '../assets/dlib.png';
import SqlLogo from '../assets/sql.png';
import StreamLitLogo from '../assets/streamlit.png';
import HBSLogo from '../assets/hbs.png';
import HerokuLogo from '../assets/heroku.png';
import JWTLogo from '../assets/jwt.png';
import CloudinaryLogo from '../assets/cloudinary.png';
import TensorflowLogo from '../assets/tensorflow.png';
import NgrokLogo from '../assets/ngrok.png';
import HuggingFaceLogo from '../assets/huggingface.png';
import TMDBLogo from '../assets/tmdb.png';
import GPTLogo from '../assets/gpt.png';
import TwilioLogo from '../assets/twilio.png';
import '../styles/projectDetails.css';

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${projectId}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error('Failed to load project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  const renderCustomMarkdown = (markdown) => {
    // Trim and split into sections using '## ' as delimiter, filtering out empties and invalid blocks
    const blocks = markdown
      .trim()
      .split(/^##\s+/gm)
      .map(block => block.trim())
      .filter(block => block && block.includes('\n'));

    return blocks.map((block, index) => {
      const [titleLine, ...contentLines] = block.split('\n');
      const content = contentLines.join('\n').trim();

      return (
        <Box key={index} mb={5}>
          <Typography
            variant="h5"
            fontWeight={700}
            mb={1}
            sx={{ fontFamily: 'Inter, sans-serif', color: '#ffffff' }}
          >
            {titleLine.trim()}
          </Typography>

          <Box
            sx={{
              backgroundColor: '#1e1e1e',
              padding: '1.2rem 1.5rem',
              borderRadius: '12px',
              color: '#e8e8e8',
              fontSize: '1rem',
              lineHeight: 1.8,
              fontFamily: 'Inter, sans-serif',
              overflowX: 'auto',
              boxShadow: '0 0 0 1px #ffffff11'
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h3: ({ node, ...props }) => (
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    mt={2}
                    mb={1}
                    sx={{ fontFamily: 'Inter, sans-serif', color: '#ffffff' }}
                  >
                    {props.children}
                  </Typography>
                ),
                p: ({ node, ...props }) => (
                  <Typography
                    component="p"
                    fontSize="1rem"
                    mb={1.5}
                    sx={{ fontFamily: 'Inter, sans-serif', color: '#e8e8e8' }}
                  >
                    {props.children}
                  </Typography>
                ),
                ul: ({ node, ...props }) => (
                  <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>{props.children}</ul>
                ),
                li: ({ node, ...props }) => (
                  <li style={{ marginBottom: '0.5rem' }}>{props.children}</li>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </Box>
        </Box>
      );
    });
  };

  if (loading) return <div style={{ color: 'white', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>Loading...</div>;
  if (!project) return <div style={{ color: 'white', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>Project not found.</div>;


  const tagLogoMap = {
    react: ReactLogo,
    node: NodeLogo,
    express: NodeLogo,
    flask: FlaskLogo,
    mongo: MongoLogo,
    postgres: PostGresLogo,
    python: PythonLogo,
    pytorch: PytorchLogo,
    torch: PytorchLogo,
    scikit: ScikitLogo,
    sequelize: SequelizeLogo,
    sql: SqlLogo,
    ejs: EJSLogo,
    jquery: JqueryLogo,
    javascript: JavascriptLogo,
    passport: PassportLogo,
    paytm: PaytmLogo,
    opencv: OpenCVLogo,
    zoom: ZoomLogo,
    html: HTMLLogo,
    css: CSSLogo,
    firebase: FirebaseLogo,
    dlib: DlibLogo,
    streamlit: StreamLitLogo,
    tmdb: TMDBLogo,
    hbs: HBSLogo,
    gpt: GPTLogo,
    heroku: HerokuLogo,
    jwt: JWTLogo,
    cloudinary: CloudinaryLogo,
    tensorflow: TensorflowLogo,
    ngrok: NgrokLogo,
    twilio: TwilioLogo,
    hugging: HuggingFaceLogo,
    transformer: HuggingFaceLogo,
  };


  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="/videos/background3.mp4" type="video/mp4" />
      </video>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          minHeight: '100vh',
          color: 'white',
          padding: { xs: 2, md: 4, lg: 6 },
          backdropFilter: 'blur(14px)',
          gap: { xs: 3, lg: 6 },
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {/* Left: Main Image */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            position: { lg: 'sticky' },
            top: { lg: '2rem' },
            height: { lg: 'fit-content' }
          }}
        >
          <img
            src={project.images[0].split(" ")[0]}
            alt="Main Screenshot"
            onClick={() => handleImageClick(project.images[0].split(" ")[0])}
            style={{
              borderRadius: '20px',
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'cover',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </Box>

        {/* Right: Content */}
        <Box flex={2}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h3" fontWeight="700" sx={{ fontFamily: 'Inter, sans-serif' }}>
              {project.title}
            </Typography>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/ios11/512/FFFFFF/github.png"
                width="40"
                height="40"
                alt="GitHub"
                style={{ transition: 'opacity 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              />
            </a>
          </Box>



          <Box mb={4} display="flex" flexWrap="wrap" gap={1}>
            {project.tags.map((tag, index) => {
              const lowerTag = tag.toLowerCase();
              const logoEntry = Object.entries(tagLogoMap).find(([key]) => lowerTag.includes(key));
              const logo = logoEntry ? logoEntry[1] : null;

              return (
                <Chip
                  key={index}
                  icon={logo ? <Avatar src={logo} sx={{ width: 20, height: 20 }} /> : null}
                  label={tag}
                  sx={{
                    backgroundColor: '#ffffff22',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    fontFamily: 'Roboto, sans-serif',
                    border: '1px solid #ffffff33'
                  }}
                />
              );
            })}
          </Box>

          {renderCustomMarkdown(project.description)}

          {/* Screenshots Section */}
          <Typography variant="h5" fontWeight="700" mt={4} mb={3} sx={{ fontFamily: 'Inter, sans-serif' }}>
            Screenshots
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            sx={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            {project.images[0].split(" ").map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Screenshot ${idx + 2}`}
                onClick={() => handleImageClick(img)}
                style={{
                  width: '280px',
                  height: '180px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: '1px solid #ffffff22'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Image Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none'
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: -50,
              right: -10,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.9)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Enlarged view"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '12px',
              objectFit: 'contain'
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default ProjectDetail;

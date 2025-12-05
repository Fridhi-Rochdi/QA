import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../services/productService';

// Icônes SVG
const PackageIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const EditIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const DollarSignIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const TagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Électronique',
    isActive: true,
    image_url: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setFormData({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        stock: data.product.stock,
        category: data.product.category,
        isActive: data.product.isActive,
        image_url: data.product.image_url || ''
      });
      if (data.product.image_url) {
        setImagePreview(data.product.image_url);
      }
    } catch (err) {
      setError('Erreur lors du chargement du produit');
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5MB');
        return;
      }
      
      // Vérifier le type
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image valide');
        return;
      }
      
      setImageFile(file);
      setError('');
      
      // Créer preview et mettre à jour formData
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await updateProduct(id, formData);
        alert('✅ Produit mis à jour avec succès');
      } else {
        await createProduct(formData);
        alert('✅ Produit créé avec succès');
      }
      navigate('/vendor/products');
    } catch (err) {
      setError(err.error || 'Erreur lors de la sauvegarde du produit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        padding: '60px 0 40px',
        marginBottom: '3rem'
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
            }}>
              {isEdit ? <EditIcon /> : <PackageIcon />}
            </div>
            <div>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: 'white',
                margin: 0,
                marginBottom: '0.5rem'
              }}>
                {isEdit ? 'Modifier le produit' : 'Ajouter un produit'}
              </h1>
              <p style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '1.1rem',
                margin: 0
              }}>
                {isEdit ? 'Mettez à jour les informations de votre produit' : 'Créez un nouveau produit pour votre catalogue'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '3rem', maxWidth: '900px' }}>
        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <XIcon />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '2.5rem' }}>
            {/* Nom du produit */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '0.75rem'
              }}>
                <FileTextIcon />
                Nom du produit
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ex: Smartphone Samsung Galaxy"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '0.75rem'
              }}>
                <FileTextIcon />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Décrivez votre produit en détail..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Prix et Stock */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#2d3748',
                  marginBottom: '0.75rem'
                }}>
                  <DollarSignIcon />
                  Prix (€)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    fontSize: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#2d3748',
                  marginBottom: '0.75rem'
                }}>
                  <TagIcon />
                  Stock disponible
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    fontSize: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>

            {/* Catégorie */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '0.75rem'
              }}>
                <TagIcon />
                Catégorie
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              >
                <option value="Électronique">Électronique</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Maison">Maison & Décoration</option>
                <option value="Sport">Sport & Loisirs</option>
                <option value="Livres">Livres</option>
                <option value="Beauté">Beauté & Santé</option>
                <option value="Jouets">Jouets & Jeux</option>
                <option value="Alimentation">Alimentation</option>
                <option value="Automobile">Automobile</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '0.75rem'
              }}>
                <ImageIcon />
                Image du produit
              </label>
              
              {!imagePreview && !formData.image_url ? (
                <div style={{ position: 'relative' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '3rem 2rem',
                      border: '2px dashed #cbd5e1',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#f8fafc'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.backgroundColor = '#f0f4ff';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#cbd5e1';
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                  >
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <UploadIcon />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#2d3748',
                        marginBottom: '0.25rem'
                      }}>
                        Cliquez pour uploader une image
                      </p>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '0.875rem',
                        color: '#64748b'
                      }}>
                        PNG, JPG, WEBP jusqu'à 5MB
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid #e2e8f0'
                }}>
                  <img
                    src={imagePreview || formData.image_url}
                    alt="Preview"
                    style={{
                      width: '100%',
                      maxHeight: '300px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(239, 68, 68, 0.95)',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.1)';
                      e.target.style.background = 'rgba(220, 38, 38, 0.95)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.background = 'rgba(239, 68, 68, 0.95)';
                    }}
                  >
                    <XIcon />
                  </button>
                </div>
              )}
              
              <p style={{
                fontSize: '0.875rem',
                color: '#64748b',
                marginTop: '0.5rem',
                marginBottom: 0
              }}>
                Ou vous pouvez entrer une URL d'image ci-dessous
              </p>
              
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  marginTop: '0.75rem'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Produit actif */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#2d3748'
              }}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <span>Produit actif (visible pour les clients)</span>
              </label>
            </div>

            {/* Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e2e8f0'
            }}>
              <button 
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'white',
                  background: loading ? '#94a3b8' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: loading ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
                onMouseOver={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                  }
                }}
              >
                <CheckCircleIcon />
                {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le produit'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/vendor/products')}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#64748b',
                  background: 'white',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.backgroundColor = '#f8fafc';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.backgroundColor = 'white';
                }}
              >
                <XIcon />
                Annuler
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

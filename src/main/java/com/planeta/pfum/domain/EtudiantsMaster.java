package com.planeta.pfum.domain;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.planeta.pfum.domain.enumeration.DiplomeBac;
import com.planeta.pfum.domain.enumeration.Mention;

/**
 * A EtudiantsMaster.
 */
@Entity
@Table(name = "etudiants_master")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EtudiantsMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "suffixe")
    private String suffixe;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "date_naissance", nullable = false)
    private Instant dateNaissance;

    @NotNull
    @Column(name = "adresse_contact", nullable = false)
    private String adresseContact;

    @Column(name = "ville")
    private String ville;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_bac")
    private DiplomeBac typeBac;

    @Enumerated(EnumType.STRING)
    @Column(name = "mention")
    private Mention mention;

    @Column(name = "annee_obtention")
    private String anneeObtention;
    
    @NotNull
    @Column(name = "licence", nullable = false)
    private String licence;
    
    @NotNull
    @Column(name = "annee_Obtention_Licence", nullable = false)
    private String anneeObtentionLicence;
    
    @NotNull
    @Column(name = "etablissement_Obtention_Licence", nullable = false)
    private String etablissementObtentionLicence;

    @NotNull
    @Column(name = "cin_pass", nullable = false)
    private String cinPass;

    @Column(name = "pays_nationalite")
    private String paysNationalite;

    @Column(name = "pays_residence")
    private String paysResidence;

    @Column(name = "codepostal")
    private String codepostal;

    @Column(name = "province")
    private String province;

    @Column(name = "tel")
    private String tel;

    @Column(name = "deuxieme_tel")
    private String deuxiemeTel;

    
    @Lob
    @Column(name = "photo", nullable = false)
    private byte[] photo;

    @Column(name = "photo_content_type", nullable = false)
    private String photoContentType;

    @Lob
    @Column(name = "test_admission")
    private byte[] testAdmission;

    @Column(name = "test_admission_content_type")
    private String testAdmissionContentType;

    @Lob
    @Column(name = "releves_notes")
    private byte[] relevesNotes;

    @Column(name = "releves_notes_content_type")
    private String relevesNotesContentType;

    
    @Lob
    @Column(name = "bacalaureat", nullable = false)
    private byte[] bacalaureat;

    @Column(name = "bacalaureat_content_type", nullable = false)
    private String bacalaureatContentType;

    
    @Lob
    @Column(name = "cin_passport", nullable = false)
    private byte[] cinPassport;

    @Column(name = "cin_passport_content_type", nullable = false)
    private String cinPassportContentType;

    @Lob
    @Column(name = "diplome")
    private byte[] diplome;

    @Column(name = "diplome_content_type")
    private String diplomeContentType;

    @Column(name = "inscriptionvalide")
    private Boolean inscriptionvalide;

    @Column(name = "absent")
    private Boolean absent;

    @Column(name = "etablissement_obtention")
    private String etablissementObtention;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "etudiantsMaster")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Absence> absences = new HashSet<>();

    @OneToMany(mappedBy = "etudiantMaster")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EspaceEtudiant> espaceEtudiants = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("etudiantsMasters")
    private Filiere filiere;

    @ManyToOne
    @JsonIgnoreProperties("etudiantsMasters")
    private AnneeInscription anneeInscription;

    @ManyToOne
    @JsonIgnoreProperties("etudiantsMasters")
    private ModalitePaiement modalite;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSuffixe() {
        return suffixe;
    }

    public EtudiantsMaster suffixe(String suffixe) {
        this.suffixe = suffixe;
        return this;
    }

    public void setSuffixe(String suffixe) {
        this.suffixe = suffixe;
    }

    public String getNom() {
        return nom;
    }

    public EtudiantsMaster nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public EtudiantsMaster prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Instant getDateNaissance() {
        return dateNaissance;
    }

    public EtudiantsMaster dateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getAdresseContact() {
        return adresseContact;
    }

    public EtudiantsMaster adresseContact(String adresseContact) {
        this.adresseContact = adresseContact;
        return this;
    }

    public void setAdresseContact(String adresseContact) {
        this.adresseContact = adresseContact;
    }

    public String getVille() {
        return ville;
    }

    public EtudiantsMaster ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getEmail() {
        return email;
    }

    public EtudiantsMaster email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public DiplomeBac getTypeBac() {
        return typeBac;
    }

    public EtudiantsMaster typeBac(DiplomeBac typeBac) {
        this.typeBac = typeBac;
        return this;
    }

    public void setTypeBac(DiplomeBac typeBac) {
        this.typeBac = typeBac;
    }

    public Mention getMention() {
        return mention;
    }

    public EtudiantsMaster mention(Mention mention) {
        this.mention = mention;
        return this;
    }

    public void setMention(Mention mention) {
        this.mention = mention;
    }

    public String getAnneeObtention() {
        return anneeObtention;
    }

    public EtudiantsMaster anneeObtention(String anneeObtention) {
        this.anneeObtention = anneeObtention;
        return this;
    }

    public void setAnneeObtention(String anneeObtention) {
        this.anneeObtention = anneeObtention;
    }
    
    
    
    public String getLicence() {
        return licence;
    }

    public EtudiantsMaster licence(String licence) {
        this.licence = licence;
        return this;
    }

    public void setLicence(String licence) {
        this.licence = licence;
    }
    
    public String getAnneeObtentionLicence() {
        return anneeObtentionLicence;
    }

    public EtudiantsMaster anneeObtentionLicence(String anneeObtentionLicence) {
        this.anneeObtentionLicence = anneeObtentionLicence;
        return this;
    }

    public void setAnneeObtentionLicence(String anneeObtentionLicence) {
        this.anneeObtentionLicence = anneeObtentionLicence;
    }
    
    public String getEtablissementObtentionLicence() {
        return etablissementObtentionLicence;
    }

    public EtudiantsMaster etablissementObtentionLicence(String etablissementObtentionLicence) {
        this.etablissementObtentionLicence = etablissementObtentionLicence;
        return this;
    }

    public void setEtablissementObtentionLicence(String etablissementObtentionLicence) {
        this.etablissementObtentionLicence = etablissementObtentionLicence;
    }
    

    public String getCinPass() {
        return cinPass;
    }

    public EtudiantsMaster cinPass(String cinPass) {
        this.cinPass = cinPass;
        return this;
    }

    public void setCinPass(String cinPass) {
        this.cinPass = cinPass;
    }

    public String getPaysNationalite() {
        return paysNationalite;
    }

    public EtudiantsMaster paysNationalite(String paysNationalite) {
        this.paysNationalite = paysNationalite;
        return this;
    }

    public void setPaysNationalite(String paysNationalite) {
        this.paysNationalite = paysNationalite;
    }

    public String getPaysResidence() {
        return paysResidence;
    }

    public EtudiantsMaster paysResidence(String paysResidence) {
        this.paysResidence = paysResidence;
        return this;
    }

    public void setPaysResidence(String paysResidence) {
        this.paysResidence = paysResidence;
    }

    public String getCodepostal() {
        return codepostal;
    }

    public EtudiantsMaster codepostal(String codepostal) {
        this.codepostal = codepostal;
        return this;
    }

    public void setCodepostal(String codepostal) {
        this.codepostal = codepostal;
    }

    public String getProvince() {
        return province;
    }

    public EtudiantsMaster province(String province) {
        this.province = province;
        return this;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getTel() {
        return tel;
    }

    public EtudiantsMaster tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getDeuxiemeTel() {
        return deuxiemeTel;
    }

    public EtudiantsMaster deuxiemeTel(String deuxiemeTel) {
        this.deuxiemeTel = deuxiemeTel;
        return this;
    }

    public void setDeuxiemeTel(String deuxiemeTel) {
        this.deuxiemeTel = deuxiemeTel;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public EtudiantsMaster photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public EtudiantsMaster photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public byte[] getTestAdmission() {
        return testAdmission;
    }

    public EtudiantsMaster testAdmission(byte[] testAdmission) {
        this.testAdmission = testAdmission;
        return this;
    }

    public void setTestAdmission(byte[] testAdmission) {
        this.testAdmission = testAdmission;
    }

    public String getTestAdmissionContentType() {
        return testAdmissionContentType;
    }

    public EtudiantsMaster testAdmissionContentType(String testAdmissionContentType) {
        this.testAdmissionContentType = testAdmissionContentType;
        return this;
    }

    public void setTestAdmissionContentType(String testAdmissionContentType) {
        this.testAdmissionContentType = testAdmissionContentType;
    }

    public byte[] getRelevesNotes() {
        return relevesNotes;
    }

    public EtudiantsMaster relevesNotes(byte[] relevesNotes) {
        this.relevesNotes = relevesNotes;
        return this;
    }

    public void setRelevesNotes(byte[] relevesNotes) {
        this.relevesNotes = relevesNotes;
    }

    public String getRelevesNotesContentType() {
        return relevesNotesContentType;
    }

    public EtudiantsMaster relevesNotesContentType(String relevesNotesContentType) {
        this.relevesNotesContentType = relevesNotesContentType;
        return this;
    }

    public void setRelevesNotesContentType(String relevesNotesContentType) {
        this.relevesNotesContentType = relevesNotesContentType;
    }

    public byte[] getBacalaureat() {
        return bacalaureat;
    }

    public EtudiantsMaster bacalaureat(byte[] bacalaureat) {
        this.bacalaureat = bacalaureat;
        return this;
    }

    public void setBacalaureat(byte[] bacalaureat) {
        this.bacalaureat = bacalaureat;
    }

    public String getBacalaureatContentType() {
        return bacalaureatContentType;
    }

    public EtudiantsMaster bacalaureatContentType(String bacalaureatContentType) {
        this.bacalaureatContentType = bacalaureatContentType;
        return this;
    }

    public void setBacalaureatContentType(String bacalaureatContentType) {
        this.bacalaureatContentType = bacalaureatContentType;
    }

    public byte[] getCinPassport() {
        return cinPassport;
    }

    public EtudiantsMaster cinPassport(byte[] cinPassport) {
        this.cinPassport = cinPassport;
        return this;
    }

    public void setCinPassport(byte[] cinPassport) {
        this.cinPassport = cinPassport;
    }

    public String getCinPassportContentType() {
        return cinPassportContentType;
    }

    public EtudiantsMaster cinPassportContentType(String cinPassportContentType) {
        this.cinPassportContentType = cinPassportContentType;
        return this;
    }

    public void setCinPassportContentType(String cinPassportContentType) {
        this.cinPassportContentType = cinPassportContentType;
    }

    public byte[] getDiplome() {
        return diplome;
    }

    public EtudiantsMaster diplome(byte[] diplome) {
        this.diplome = diplome;
        return this;
    }

    public void setDiplome(byte[] diplome) {
        this.diplome = diplome;
    }

    public String getDiplomeContentType() {
        return diplomeContentType;
    }

    public EtudiantsMaster diplomeContentType(String diplomeContentType) {
        this.diplomeContentType = diplomeContentType;
        return this;
    }

    public void setDiplomeContentType(String diplomeContentType) {
        this.diplomeContentType = diplomeContentType;
    }

    public Boolean isInscriptionvalide() {
        return inscriptionvalide;
    }

    public EtudiantsMaster inscriptionvalide(Boolean inscriptionvalide) {
        this.inscriptionvalide = inscriptionvalide;
        return this;
    }

    public void setInscriptionvalide(Boolean inscriptionvalide) {
        this.inscriptionvalide = inscriptionvalide;
    }

    public Boolean isAbsent() {
        return absent;
    }

    public EtudiantsMaster absent(Boolean absent) {
        this.absent = absent;
        return this;
    }

    public void setAbsent(Boolean absent) {
        this.absent = absent;
    }

    public String getEtablissementObtention() {
        return etablissementObtention;
    }

    public EtudiantsMaster etablissementObtention(String etablissementObtention) {
        this.etablissementObtention = etablissementObtention;
        return this;
    }

    public void setEtablissementObtention(String etablissementObtention) {
        this.etablissementObtention = etablissementObtention;
    }

    public User getUser() {
        return user;
    }

    public EtudiantsMaster user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Absence> getAbsences() {
        return absences;
    }

    public EtudiantsMaster absences(Set<Absence> absences) {
        this.absences = absences;
        return this;
    }

    public EtudiantsMaster addAbsence(Absence absence) {
        this.absences.add(absence);
        absence.setEtudiantsMaster(this);
        return this;
    }

    public EtudiantsMaster removeAbsence(Absence absence) {
        this.absences.remove(absence);
        absence.setEtudiantsMaster(null);
        return this;
    }

    public void setAbsences(Set<Absence> absences) {
        this.absences = absences;
    }

    public Set<EspaceEtudiant> getEspaceEtudiants() {
        return espaceEtudiants;
    }

    public EtudiantsMaster espaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
        return this;
    }

    public EtudiantsMaster addEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.add(espaceEtudiant);
        espaceEtudiant.setEtudiantMaster(this);
        return this;
    }

    public EtudiantsMaster removeEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.remove(espaceEtudiant);
        espaceEtudiant.setEtudiantMaster(null);
        return this;
    }

    public void setEspaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
    }

    public Filiere getFiliere() {
        return filiere;
    }

    public EtudiantsMaster filiere(Filiere filiere) {
        this.filiere = filiere;
        return this;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public AnneeInscription getAnneeInscription() {
        return anneeInscription;
    }

    public EtudiantsMaster anneeInscription(AnneeInscription anneeInscription) {
        this.anneeInscription = anneeInscription;
        return this;
    }

    public void setAnneeInscription(AnneeInscription anneeInscription) {
        this.anneeInscription = anneeInscription;
    }

    public ModalitePaiement getModalite() {
        return modalite;
    }

    public EtudiantsMaster modalite(ModalitePaiement modalitePaiement) {
        this.modalite = modalitePaiement;
        return this;
    }

    public void setModalite(ModalitePaiement modalitePaiement) {
        this.modalite = modalitePaiement;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EtudiantsMaster)) {
            return false;
        }
        return id != null && id.equals(((EtudiantsMaster) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EtudiantsMaster{" +
            "id=" + getId() +
            ", suffixe='" + getSuffixe() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", adresseContact='" + getAdresseContact() + "'" +
            ", ville='" + getVille() + "'" +
            ", email='" + getEmail() + "'" +
            ", typeBac='" + getTypeBac() + "'" +
            ", mention='" + getMention() + "'" +
            ", anneeObtention='" + getAnneeObtention() + "'" +
            ", cinPass='" + getCinPass() + "'" +
            ", paysNationalite='" + getPaysNationalite() + "'" +
            ", paysResidence='" + getPaysResidence() + "'" +
            ", codepostal='" + getCodepostal() + "'" +
            ", province='" + getProvince() + "'" +
            ", tel=" + getTel() +
            ", deuxiemeTel=" + getDeuxiemeTel() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", testAdmission='" + getTestAdmission() + "'" +
            ", testAdmissionContentType='" + getTestAdmissionContentType() + "'" +
            ", relevesNotes='" + getRelevesNotes() + "'" +
            ", relevesNotesContentType='" + getRelevesNotesContentType() + "'" +
            ", bacalaureat='" + getBacalaureat() + "'" +
            ", bacalaureatContentType='" + getBacalaureatContentType() + "'" +
            ", cinPassport='" + getCinPassport() + "'" +
            ", cinPassportContentType='" + getCinPassportContentType() + "'" +
            ", diplome='" + getDiplome() + "'" +
            ", diplomeContentType='" + getDiplomeContentType() + "'" +
            ", inscriptionvalide='" + isInscriptionvalide() + "'" +
            ", absent='" + isAbsent() + "'" +
            ", etablissementObtention='" + getEtablissementObtention() + "'" +
            "}";
    }
}

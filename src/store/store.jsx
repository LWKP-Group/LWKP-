import { configureStore } from "@reduxjs/toolkit";
import philosophyReducer from "./slices/philosophySlice";
import projectsReducer from "./slices/projectsSlice";
import loaderReducer from "./slices/loaderSlice";
import storiesReducer from "./slices/storiesSlice";
import insightReducer from "./slices/insightSlice";
import aboutusReducer from "./slices/aboutusSlice";
import purposeReducer from "./slices/purposeSlice";
import studiopageReducer from "./slices/studioPageSlice";
import studiolocationReducer from "./slices/studioSlice";
import projectTypeReducer from "./slices/projectTypeSlice";
import storypageReducer from "./slices/storyPage";
import portfolioPageReducer from "./slices/portfolioPageSlice";
import philsophyPageReducer from "./slices/philosophyPageSlice";
import homePageReducer from "./slices/homePageSlice";
import projectLocationsReducer from "./slices/projectLocationSlice";
import recognitionPageReducer from "./slices/recognitionPageSlice";
import insightPageReducer from "./slices/insightPageSlice";
import insightCategoryReducer from "./slices/insightCategorySlice";
import careerPageReducer from "./slices/careerPageSlice";
import reviewsReducer from "./slices/reviewSlice";
import jobCategoryReducer from "./slices/jobCategorySlice";
import peoplePageReducer from "./slices/peoplePageSlice";
import peopleDepartReducer from "./slices/peopleDepartSlice";
import awardsPageReducer from "./slices/AwardsPageSlice";
import awardsReducer from "./slices/awardsSlice";
import projectsArchiveReducer from "./slices/projectsArchiveSlice";
import projectsPaginatedReducer from "./slices/projectsPaginatedSlice";
import homestoriesReducer from "./slices/storiesHomeSlice";
import jobReducer from "./slices/jobSlice";
import contactusReducer from "./slices/contactUsSlice";
import contactFormReducer from "./slices/contactFormSlice";
import mediaPageReducer from "./slices/mediaPageSlice";
import mediaReducer from "./slices/mediaSlice";
import mediaCategoryReducer from "./slices/mediaCategorySlice";
import timelinePageReducer from "./slices/timelinePageSlice";
import timelineReducer from "./slices/timelineSlice";
import newsletterReducer from "./slices/newsletterSlice";
import rankingPageReducer from "./slices/rankingPageSlice";
import rankingReducer from "./slices/rankingSlice";
import partnershipPageReducer from "./slices/partnershipPageSlice";
import partnershipReducer from "./slices/partnershipSlice";
import philosophyAllReducer from "./slices/philosophyAllSlice";
import storyCategoryReducer from "./slices/storyCategorySlice";
import storyByCategoryReducer from "./slices/storyByCategorySlice";

export const store = configureStore({
  reducer: {
    partnership: partnershipReducer,
    partnershipPage: partnershipPageReducer,
    ranking: rankingReducer,
    rankingPage: rankingPageReducer,
    newsletter: newsletterReducer,
    timeline: timelineReducer,
    timelinePage: timelinePageReducer,
    media: mediaReducer,
    mediaCategories: mediaCategoryReducer,
    mediaPage: mediaPageReducer,
    contactForm: contactFormReducer,
    contactus: contactusReducer,
    jobs: jobReducer,
    homestories: homestoriesReducer,
    projectsPaginated: projectsPaginatedReducer,
    projectsArchive: projectsArchiveReducer,
    awards: awardsReducer,
    awardsPage: awardsPageReducer,
    peopleDepart: peopleDepartReducer,
    peoplePage: peoplePageReducer,
    jobCategories: jobCategoryReducer,
    reviews: reviewsReducer,
    careerPage: careerPageReducer,
    insightCategories: insightCategoryReducer,
    insightPage: insightPageReducer,
    recognitionPage: recognitionPageReducer,
    projectLocations: projectLocationsReducer,
    homePage: homePageReducer,
    philsophyPage: philsophyPageReducer,
    portfolioPage: portfolioPageReducer,
    storypage: storypageReducer,
    projectTypes: projectTypeReducer,
    studiolocation: studiolocationReducer,
    studiopage: studiopageReducer,
    purpose: purposeReducer,
    aboutus: aboutusReducer,
    insight: insightReducer,
    stories: storiesReducer,
    projects: projectsReducer,
    philosophyAll: philosophyAllReducer,
    philosophy: philosophyReducer,
    loader: loaderReducer,
    storyCategory: storyCategoryReducer,
    storiesByCategory: storyByCategoryReducer,
  },
});

import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PageController, trackEntityPageViewEvent, trackPageViewEvent } from '@sitecore-search/react';

import { ENTITY_CONTENT, PAGE_EVENTS_DEFAULT, PAGE_EVENTS_PDP } from '../data/constants';
import useUri from '../hooks/useUri';

export const PageEventContext = React.createContext({});
/**
 * The page view event is handled in sitecore SDK, but for SPA it just happens on the first time.
 * So when user navigate is needed to track the page view event manually.
 * This is the purpose of this hoc, set page uri and track the page view event
 */
const withPageTracking =
  (Component: React.ElementType, pageType = PAGE_EVENTS_DEFAULT) =>
  (props: any) => {
    const uri = useUri();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
      PageController.getContext().setPageUri(uri);

      if (id && pageType === PAGE_EVENTS_PDP) {
      } else {
        trackPageViewEvent(pageType);
      }
    }, [uri, id]);

    return (
      <PageEventContext.Provider value={pageType}>
        <Component {...{ props }} />
      </PageEventContext.Provider>
    );
  };

export default withPageTracking;

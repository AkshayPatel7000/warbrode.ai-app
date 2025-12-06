/**
 * Home/Dashboard API Usage Examples
 *
 * Examples for using the new dashboard API endpoint
 */

import ApiService from '../services/api.service';
import type { DashboardResponse, ClothesListParams } from '../types/api.types';

// ============================================
// DASHBOARD API EXAMPLES
// ============================================

/**
 * Example: Get Dashboard Data
 * Fetches user info, today's outfit, weather, wardrobe stats, and AI tips
 */
export const getDashboardExample = async () => {
  try {
    const response = await ApiService.getDashboard();
    const data: DashboardResponse = response.data;

    console.log('User:', data.user.name);
    console.log('Avatar:', data.user.avatar);

    // Today's outfit (may be null if not generated)
    if (data.todayOutfit) {
      console.log("Today's Outfit:");
      console.log('  - Preview:', data.todayOutfit.previewImage);
      console.log('  - AI Score:', data.todayOutfit.score);
      console.log('  - AI Reason:', data.todayOutfit.aiReason);
    } else {
      console.log('No outfit generated for today');
    }

    // Weather (may be null if location not set)
    if (data.weather) {
      console.log('Weather:');
      console.log('  - Temperature:', data.weather.tempC, '°C');
      console.log('  - Precipitation:', data.weather.precipitation, 'mm');
    }

    // Wardrobe stats
    console.log('Wardrobe Stats:');
    console.log('  - Tops:', data.wardrobeStats.tops);
    console.log('  - Bottoms:', data.wardrobeStats.bottoms);
    console.log('  - Footwear:', data.wardrobeStats.footwear);
    console.log('  - Total:', data.wardrobeStats.total);

    // Quick actions
    console.log('Quick Actions:');
    data.quickActions.forEach(action => {
      console.log(`  - ${action.label} (${action.icon})`);
    });

    // AI tip
    console.log('AI Tip:', data.aiTip);

    return data;
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    throw error;
  }
};

/**
 * Example: Display Dashboard in React Component
 */
export const DashboardComponent = () => {
  /*
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await ApiService.getDashboard();
        setDashboard(response.data);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!dashboard) return <ErrorMessage />;

  return (
    <View>
      <Text>Welcome, {dashboard.user.name}!</Text>
      
      {dashboard.todayOutfit && (
        <OutfitCard
          image={dashboard.todayOutfit.previewImage}
          score={dashboard.todayOutfit.score}
          reason={dashboard.todayOutfit.aiReason}
        />
      )}

      <WardrobeStats stats={dashboard.wardrobeStats} />
      
      {dashboard.weather && (
        <WeatherCard weather={dashboard.weather} />
      )}

      <AITip tip={dashboard.aiTip} />
    </View>
  );
  */
};

// ============================================
// UPDATED CLOTHES API EXAMPLES
// ============================================

/**
 * Example: Get All Clothes (Basic)
 */
export const getClothesBasicExample = async () => {
  try {
    const response = await ApiService.getClothes();

    console.log('Page:', response.data.page);
    console.log('Total Items:', response.data.total);
    console.log('Total Pages:', response.data.totalPages);
    console.log('Has Next Page:', response.data.hasNextPage);

    response.data.items.forEach(item => {
      console.log(`${item.type} - ${item.colorHex} - ${item.pattern}`);
      console.log('  Tags:', item.tags.join(', '));
      console.log('  Dirty:', item.isDirty);
    });

    return response.data;
  } catch (error) {
    console.error('Failed to get clothes:', error);
    throw error;
  }
};

/**
 * Example: Get Clothes with Pagination
 */
export const getClothesPaginatedExample = async (page: number = 1) => {
  try {
    const params: ClothesListParams = {
      page,
      limit: 20,
    };

    const response = await ApiService.getClothes(params);

    console.log(`Page ${response.data.page} of ${response.data.totalPages}`);
    console.log(
      `Showing ${response.data.items.length} of ${response.data.total} items`,
    );

    return response.data;
  } catch (error) {
    console.error('Failed to get clothes:', error);
    throw error;
  }
};

/**
 * Example: Filter Clothes by Type
 */
export const getClothesFilteredExample = async () => {
  try {
    const params: ClothesListParams = {
      type: 'shirt',
      page: 1,
      limit: 20,
    };

    const response = await ApiService.getClothes(params);

    console.log('Filters Applied:', response.data.filtersApplied);
    console.log(`Found ${response.data.total} shirts`);

    return response.data;
  } catch (error) {
    console.error('Failed to filter clothes:', error);
    throw error;
  }
};

/**
 * Example: Search Clothes
 */
export const searchClothesExample = async (searchTerm: string) => {
  try {
    const params: ClothesListParams = {
      search: searchTerm,
      page: 1,
      limit: 20,
    };

    const response = await ApiService.getClothes(params);

    console.log(`Found ${response.data.total} items matching "${searchTerm}"`);

    return response.data;
  } catch (error) {
    console.error('Failed to search clothes:', error);
    throw error;
  }
};

/**
 * Example: Get Dirty Clothes
 */
export const getDirtyClothesExample = async () => {
  try {
    const params: ClothesListParams = {
      dirty: true,
      sort: 'createdAt',
      order: 'desc',
    };

    const response = await ApiService.getClothes(params);

    console.log(`You have ${response.data.total} dirty items`);

    return response.data;
  } catch (error) {
    console.error('Failed to get dirty clothes:', error);
    throw error;
  }
};

/**
 * Example: Filter by Multiple Criteria
 */
export const getClothesAdvancedFilterExample = async () => {
  try {
    const params: ClothesListParams = {
      type: 'shirt',
      pattern: 'solid',
      tags: 'casual,summer',
      dirty: false,
      sort: 'createdAt',
      order: 'desc',
      page: 1,
      limit: 10,
    };

    const response = await ApiService.getClothes(params);

    console.log('Advanced Filter Results:');
    console.log('  Type: shirt');
    console.log('  Pattern: solid');
    console.log('  Tags: casual, summer');
    console.log('  Clean only: true');
    console.log(`  Found: ${response.data.total} items`);

    return response.data;
  } catch (error) {
    console.error('Failed to filter clothes:', error);
    throw error;
  }
};

/**
 * Example: Infinite Scroll Implementation
 */
export const infiniteScrollExample = async () => {
  /*
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await ApiService.getClothes({ page, limit: 20 });
      
      setClothes(prev => [...prev, ...response.data.items]);
      setHasMore(response.data.hasNextPage);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to load more:', error);
    } finally {
      setLoading(false);
    }
  };

  // In your FlatList:
  <FlatList
    data={clothes}
    onEndReached={loadMore}
    onEndReachedThreshold={0.5}
    ListFooterComponent={loading ? <LoadingSpinner /> : null}
  />
  */
};

/**
 * Example: Complete Dashboard Workflow
 */
export const completeDashboardWorkflow = async () => {
  try {
    // 1. Load dashboard
    const dashboard = await ApiService.getDashboard();
    console.log('Dashboard loaded for:', dashboard.data.user.name);

    // 2. Get wardrobe items
    const clothes = await ApiService.getClothes({ page: 1, limit: 20 });
    console.log('Loaded', clothes.data.items.length, 'wardrobe items');

    // 3. Check for dirty clothes
    const dirtyClothes = await ApiService.getClothes({ dirty: true });
    if (dirtyClothes.data.total > 0) {
      console.log('You have', dirtyClothes.data.total, 'items to wash');
    }

    // 4. Display today's outfit if available
    if (dashboard.data.todayOutfit) {
      console.log("Today's outfit score:", dashboard.data.todayOutfit.score);
      console.log('AI says:', dashboard.data.todayOutfit.aiReason);
    }

    return {
      dashboard: dashboard.data,
      clothes: clothes.data,
      dirtyCount: dirtyClothes.data.total,
    };
  } catch (error) {
    console.error('Dashboard workflow failed:', error);
    throw error;
  }
};
